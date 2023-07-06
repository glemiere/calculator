export enum TxtCol {
  BLACK   = `\x1b[30m`,
  RED     = `\x1b[31m`,
  GREEN   = `\x1b[32m`,
  YELLOW  = `\x1b[33m`,
  WHITE   = `\x1b[37m`,
}

export enum BgCol {
  BLACK   = `\x1b[40m`,
  RED     = `\x1b[41m`,
  GREEN   = `\x1b[42m`,
  YELLOW  = `\x1b[43m`,
  WHITE   = `\x1b[47m`,
}

export default {
  text: TxtCol,
  background: BgCol
};