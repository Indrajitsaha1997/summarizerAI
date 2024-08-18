import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-summarizer-bot',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './summarizer-bot.component.html',
  styleUrl: './summarizer-bot.component.scss',
})
export class SummarizerBotComponent implements OnInit {
  public summarizerFormGroup: any = new FormGroup({
    textInput: new FormControl('', Validators.required),
  });
  public summary: string = '';
  public constructor() {}
  public ngOnInit(): void {}

  public cleanText(input: string): string {
    // Regular expression to match all punctuation and special characters
    const regex = /[^\p{L}\p{N}\s]/gu;
    // Remove punctuation and special characters and convert to lowercase
    const cleanedText = input.replace(regex, '').toLowerCase();
    return cleanedText;
  }

  public countWords(text: string): { [key: string]: number } {
    const wordCounts: { [key: string]: number } = {};
    const words = text.split(/\s+/);

    for (const word of words) {
      if (word) {
        if (wordCounts[word]) {
          wordCounts[word]++;
        } else {
          wordCounts[word] = 1;
        }
      }
    }
    return wordCounts;
  }

  public findMaxWords(wordCounts: { [key: string]: number }): {
    words: string[];
    count: number;
  } {
    let maxCount = 0;
    const maxWords: string[] = [];

    for (const word in wordCounts) {
      if (wordCounts[word] > maxCount) {
        maxCount = wordCounts[word];
        maxWords.length = 0; // Clear the array
        maxWords.push(word);
      } else if (wordCounts[word] === maxCount) {
        maxWords.push(word);
      }
    }

    return { words: maxWords, count: maxCount };
  }

  public calculateRelevanceScores(
    wordCounts: { [key: string]: number },
    maxCount: number
  ): { [key: string]: number } {
    const relevanceScores: { [key: string]: number } = {};

    for (const word in wordCounts) {
      relevanceScores[word] = wordCounts[word] / maxCount;
    }

    return relevanceScores;
  }

  public calculateSentenceRelevanceScores(
    input: string,
    relevanceScores: { [key: string]: number }
  ): { [sentence: string]: number } {
    const sentences = input.split(/(?<=[.!?।])\s+/) || [];
    const sentenceScores: { [sentence: string]: number } = {};

    for (const sentence of sentences) {
      const cleanedSentence = this.cleanText(sentence);
      const words = cleanedSentence.split(/\s+/);
      let sentenceScore = 0;

      for (const word of words) {
        if (relevanceScores[word]) {
          sentenceScore += relevanceScores[word];
        }
      }

      sentenceScores[sentence.trim()] = sentenceScore;
    }

    return sentenceScores;
  }

  public sortSentencesByScore(sentenceScores: {
    [sentence: string]: number;
  }): string[] {
    const sortedSentences = Object.keys(sentenceScores).sort(
      (a, b) => sentenceScores[b] - sentenceScores[a]
    );
    return sortedSentences;
  }

  public selectTopHalfSentences(sortedSentences: string[]): string[] {
    const halfIndex = Math.ceil(sortedSentences.length / 2);
    return sortedSentences.slice(0, halfIndex);
  }

  public reverseSortSentencesByScore(
    sentenceScores: { [sentence: string]: number },
    selectedSentences: string[]
  ): string[] {
    const sortedSentences = selectedSentences.sort(
      (a, b) => sentenceScores[a] - sentenceScores[b]
    );
    return sortedSentences;
  }

  public createSummary(sortedSentences: string[]): string {
    return sortedSentences.join(' ');
  }

  public summarize(): string {
    const textInput: string = this.summarizerFormGroup.value.textInput;
    const cleanedText = this.cleanText(textInput);
    const wordCounts = this.countWords(cleanedText);
    const maxWords = this.findMaxWords(wordCounts);
    const relevanceScores = this.calculateRelevanceScores(
      wordCounts,
      maxWords.count
    );
    const sentenceRelevanceScores = this.calculateSentenceRelevanceScores(
      textInput,
      relevanceScores
    );
    const sortedSentences = this.sortSentencesByScore(sentenceRelevanceScores);
    const topHalfSentences = this.selectTopHalfSentences(sortedSentences);
    const reverseSortedSentences = this.reverseSortSentencesByScore(
      sentenceRelevanceScores,
      topHalfSentences
    );
    this.summary = this.createSummary(reverseSortedSentences);
    console.log('Word counts:', wordCounts);
    console.log('Max words:', maxWords.words, 'with count:', maxWords.count);
    console.log('Relevance scores:', relevanceScores);
    console.log('Sentence relevance scores:', sentenceRelevanceScores);
    console.log('Sorted sentences by relevance score:', sortedSentences);
    console.log('Top half sentences:', topHalfSentences);
    console.log('Reverse sorted top half sentences:', reverseSortedSentences);
    console.log('Summary:', this.summary);
    return this.summary;
  }
}
