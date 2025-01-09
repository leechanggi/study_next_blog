import React from 'react';
import { ButtonProps } from '@/components/Atoms/Button/type';

type ImageUploadElement = HTMLButtonElement;
type ImageUploadProps = {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & ButtonProps;

export type { ImageUploadElement, ImageUploadProps };
