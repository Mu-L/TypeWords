export type Word = {
  id?: string
  custom?: boolean
  word: string
  phonetic0: string
  phonetic1: string
  trans: {
    pos: string
    cn: string
  }[]
  sentences: {
    c: string //content
    cn: string
  }[]
  phrases: {
    c: string
    cn: string
  }[]
  synos: {
    pos: string
    cn: string
    ws: string[]
  }[]
  relWords: {
    root: string
    rels: {
      pos: string
      words: {
        c: string
        cn: string
      }[]
    }[]
  }
  etymology: {
    t: string //title
    d: string //desc
  }[]
}

export const PronunciationApi = 'https://dict.youdao.com/dictvoice?audio='

export type TranslateLanguageType = 'en' | 'zh-CN' | 'ja' | 'de' | 'common' | ''
export type LanguageType = 'en' | 'ja' | 'de' | 'code'

export enum DictType {
  collect = 'collect',
  simple = 'simple',
  wrong = 'wrong',
  known = 'known',
  word = 'word',
  article = 'article',
}

export interface ArticleWord extends Word {
  nextSpace: boolean
  symbolPosition: 'start' | 'end' | ''
  input: string
  type: PracticeArticleWordType
}

export interface Sentence {
  text: string
  translate: string
  words: ArticleWord[]
  audioPosition: number[]
}

export interface Article {
  id?: number
  title: string
  titleTranslate: string
  text: string
  textTranslate: string
  newWords: Word[]
  sections: Sentence[][]
  audioSrc: string
  audioFileId: string
  lrcPosition: number[][]
  nameList: string[]
  questions: {
    stem: string
    options: string[]
    correctAnswer: string[]
    explanation: string
  }[]
}

export interface Statistics {
  startDate: number //开始日期
  spend: number //花费时间
  total: number //单词数量
  new: number //新学单词数量
  review: number //复习单词数量
  wrong: number //错误数
}

export enum Sort {
  normal = 0,
  random = 1,
  reverse = 2,
  reverseAll = 3,
  randomAll = 4,
}

export enum ShortcutKey {
  ShowWord = 'ShowWord',
  EditArticle = 'EditArticle',
  Next = 'Next',
  Previous = 'Previous',
  ToggleSimple = 'ToggleSimple',
  ToggleCollect = 'ToggleCollect',
  NextChapter = 'NextChapter',
  PreviousChapter = 'PreviousChapter',
  RepeatChapter = 'RepeatChapter',
  DictationChapter = 'DictationChapter',
  PlayWordPronunciation = 'PlayWordPronunciation',
  ToggleShowTranslate = 'ToggleShowTranslate',
  ToggleDictation = 'ToggleDictation',
  ToggleTheme = 'ToggleTheme',
  ToggleConciseMode = 'ToggleConciseMode',
  TogglePanel = 'TogglePanel',
  RandomWrite = 'RandomWrite',
  NextRandomWrite = 'NextRandomWrite',
  KnowWord = 'KnowWord',
  UnknownWord = 'UnknownWord',
}

export const DefaultShortcutKeyMap = {
  [ShortcutKey.EditArticle]: 'Ctrl+E',
  [ShortcutKey.ShowWord]: 'Escape',
  [ShortcutKey.Previous]: 'Alt+⬅',
  [ShortcutKey.Next]: 'Tab',
  [ShortcutKey.ToggleSimple]: '`',
  [ShortcutKey.ToggleCollect]: 'Enter',
  [ShortcutKey.PreviousChapter]: 'Ctrl+⬅',
  [ShortcutKey.NextChapter]: 'Ctrl+➡',
  [ShortcutKey.RepeatChapter]: 'Ctrl+Enter',
  [ShortcutKey.DictationChapter]: 'Alt+Enter',
  [ShortcutKey.PlayWordPronunciation]: 'Ctrl+P',
  [ShortcutKey.ToggleShowTranslate]: 'Ctrl+Z',
  [ShortcutKey.ToggleDictation]: 'Ctrl+I',
  [ShortcutKey.ToggleTheme]: 'Ctrl+Q',
  [ShortcutKey.ToggleConciseMode]: 'Ctrl+M',
  [ShortcutKey.TogglePanel]: 'Ctrl+L',
  [ShortcutKey.RandomWrite]: 'Ctrl+R',
  [ShortcutKey.NextRandomWrite]: 'Ctrl+Shift+R',
  [ShortcutKey.KnowWord]: '1',
  [ShortcutKey.UnknownWord]: '2',
}

export enum TranslateEngine {
  Baidu = 0,
}

export type DictResource = {
  id: string
  name: string
  description: string
  url: string
  length: number
  category: string
  tags: string[]
  translateLanguage: TranslateLanguageType
  //todo 可以考虑删除了
  type?: DictType
  version?: number
  language: LanguageType
}

export interface Dict extends DictResource {
  lastLearnIndex: number
  perDayStudyNumber: number
  words: Word[]
  articles: Article[]
  statistics: Statistics[]
  custom: boolean //是否是自定义词典
  complete: boolean //是否学习完成，学完了设为true，然后lastLearnIndex重置
  //后端字段
  en_name?: string
  createdBy?: string
  category_id?: number
  is_default?: boolean
  update?: boolean
  cover?: string
  sync?: boolean
  userDictId?: number
}

export interface ArticleItem {
  item: Article
  index: number
}

export const SlideType = {
  HORIZONTAL: 0,
  VERTICAL: 1,
}

export interface PracticeData {
  index: number
  words: Word[]
  wrongWords: Word[]
  excludeWords: string[]
}

export interface TaskWords {
  new: Word[]
  review: Word[]
  write: Word[]
  shuffle: Word[]
}

export class DictId {
  static wordCollect = 'wordCollect'
  static wordWrong = 'wordWrong'
  static wordKnown = 'wordKnown'
  static articleCollect = 'articleCollect'
}

export enum PracticeArticleWordType {
  Symbol,
  Number,
  Word,
}

//练习模式
export enum WordPracticeMode {
  System = 0,
  Free = 1,
  IdentifyOnly = 2, // 独立自测模式
  DictationOnly = 3, // 独立默写模式
  ListenOnly = 4, // 独立听写模式
  FollowWriteOnly = 5, // 独立跟写模式（内部会自动切换到 Spell）
  Shuffle = 6, // 随机复习模式
  Review = 7, // 复习模式
}

//练习类型
export enum WordPracticeType {
  FollowWrite, //跟写
  Spell,
  Identify,
  Listen,
  Dictation,
}

export enum CodeType {
  Login = 0,
  Register = 1,
  ResetPwd = 2,
  ChangeEmail = 3,
  ChangePhoneNew = 4,
  ChangePhoneOld = 5,
}

export enum ImportStatus {
  Idle = 0,
  Success = 1,
  Fail = 2,
}

//练习阶段
export enum WordPracticeStage {
  FollowWriteNewWord = 0,
  IdentifyNewWord = 1,
  ListenNewWord = 2,
  DictationNewWord = 3,

  FollowWriteReview = 4,
  IdentifyReview = 5,
  ListenReview = 6,
  DictationReview = 7,

  FollowWriteReviewAll = 8,
  IdentifyReviewAll = 9,
  ListenReviewAll = 10,
  DictationReviewAll = 11,

  Shuffle = 12,
  Complete = 13,
}

export const WordPracticeModeStageMap: Record<WordPracticeMode, WordPracticeStage[]> = {
  [WordPracticeMode.Free]: [WordPracticeStage.FollowWriteNewWord, WordPracticeStage.Complete],
  [WordPracticeMode.FollowWriteOnly]: [
    WordPracticeStage.FollowWriteNewWord,
    WordPracticeStage.FollowWriteReview,
    WordPracticeStage.FollowWriteReviewAll,
    WordPracticeStage.Complete,
  ],
  [WordPracticeMode.IdentifyOnly]: [
    WordPracticeStage.IdentifyNewWord,
    WordPracticeStage.IdentifyReview,
    WordPracticeStage.IdentifyReviewAll,
    WordPracticeStage.Complete,
  ],
  [WordPracticeMode.DictationOnly]: [
    WordPracticeStage.DictationNewWord,
    WordPracticeStage.DictationReview,
    WordPracticeStage.DictationReviewAll,
    WordPracticeStage.Complete,
  ],
  [WordPracticeMode.ListenOnly]: [
    WordPracticeStage.ListenNewWord,
    WordPracticeStage.ListenReview,
    WordPracticeStage.ListenReviewAll,
    WordPracticeStage.Complete,
  ],
  [WordPracticeMode.System]: [
    WordPracticeStage.FollowWriteNewWord,
    WordPracticeStage.ListenNewWord,
    WordPracticeStage.DictationNewWord,
    WordPracticeStage.IdentifyReview,
    WordPracticeStage.ListenReview,
    WordPracticeStage.DictationReview,
    WordPracticeStage.IdentifyReviewAll,
    WordPracticeStage.ListenReviewAll,
    WordPracticeStage.DictationReviewAll,
    WordPracticeStage.Complete,
  ],
  [WordPracticeMode.Shuffle]: [
    WordPracticeStage.Shuffle,
    WordPracticeStage.Complete,
  ],
  [WordPracticeMode.Review]: [
    WordPracticeStage.IdentifyReview,
    WordPracticeStage.ListenReview,
    WordPracticeStage.DictationReview,
    WordPracticeStage.IdentifyReviewAll,
    WordPracticeStage.ListenReviewAll,
    WordPracticeStage.DictationReviewAll,
    WordPracticeStage.Complete,
  ],
}

export const WordPracticeStageNameMap: Record<WordPracticeStage, string> = {
  [WordPracticeStage.FollowWriteNewWord]: '跟写新词',
  [WordPracticeStage.IdentifyNewWord]: '自测新词',
  [WordPracticeStage.ListenNewWord]: '听写新词',
  [WordPracticeStage.DictationNewWord]: '默写新词',
  [WordPracticeStage.FollowWriteReview]: '跟写上次学习',
  [WordPracticeStage.IdentifyReview]: '自测上次学习',
  [WordPracticeStage.ListenReview]: '听写上次学习',
  [WordPracticeStage.DictationReview]: '默写上次学习',
  [WordPracticeStage.FollowWriteReviewAll]: '跟写之前学习',
  [WordPracticeStage.IdentifyReviewAll]: '自测之前学习',
  [WordPracticeStage.ListenReviewAll]: '听写之前学习',
  [WordPracticeStage.DictationReviewAll]: '默写之前学习',
  [WordPracticeStage.Complete]: '完成学习',
  [WordPracticeStage.Shuffle]: '随机复习',
}

export const WordPracticeModeNameMap: Record<WordPracticeMode, string> = {
  [WordPracticeMode.System]: '智能学习',
  [WordPracticeMode.Free]: '自由',
  [WordPracticeMode.IdentifyOnly]: '自测',
  [WordPracticeMode.DictationOnly]: '默写',
  [WordPracticeMode.ListenOnly]: '听写',
  [WordPracticeMode.FollowWriteOnly]: '跟写',
  [WordPracticeMode.Shuffle]: '随机复习',
  [WordPracticeMode.Review]: '复习',
}
