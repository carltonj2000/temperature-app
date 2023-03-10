export type marginType = {
  top: number;
  right: number;
  left: number;
  bottom: number;
};

export type xScaleType = (i: Date) => number;
export type yScaleType = (i: number) => number;
export type studentType = { name: string; grade: number; hours: number };
export type studentsType = studentType[];
