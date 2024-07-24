// @index('./**/index.{ts,tsx}', f => `export { default as ${f.path.split('/').reverse()[1]} } from '${f.path.replace(/\/index$/, '')}';`)
export { default as Button } from './Atoms/Button';
export { default as Card } from './Molecules/Card';
export { default as DarkModeToggle } from './Molecules/DarkModeToggle';
export { default as Board } from './Organisms/Board';
export { default as BoardItem } from './Organisms/BoardItem';
export { default as Markdown } from './Organisms/Markdown';
export { default as Header } from './Templates/Header';
export { default as Main } from './Templates/Main';
// @endindex
