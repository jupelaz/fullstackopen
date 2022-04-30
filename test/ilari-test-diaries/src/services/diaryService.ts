import diaryEntries from '../../data/diaries';

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryEntries;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (
  newDiary: NewDiaryEntry
): DiaryEntry => {

const newDiaryEntry = {
  id: Math.max(...diaries.map(d => d.id)) + 1,
  ...newDiary,
}

diaries.push(newDiaryEntry);
return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById
};