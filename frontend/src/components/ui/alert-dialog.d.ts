import * as React from 'react';

export interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps>;
export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps>;
export const AlertDialogContent: React.FC<AlertDialogContentProps>;
export const AlertDialogHeader: React.FC<AlertDialogHeaderProps>;
export const AlertDialogFooter: React.FC<AlertDialogFooterProps>;
export const AlertDialogTitle: React.FC<AlertDialogTitleProps>;
export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps>;
export const AlertDialogAction: React.FC<AlertDialogActionProps>;
export const AlertDialogCancel: React.FC<AlertDialogCancelProps>;
