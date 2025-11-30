import React from 'react';

export interface SlideData {
  id: number;
  title: string;
  component: React.ReactNode;
}

export enum SlideDirection {
  NEXT = 1,
  PREV = -1,
}

export interface TeamMember {
  name: string;
  id: string;
}