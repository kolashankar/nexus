import * as React from 'react';

export interface DialogProps {}
export interface DialogTriggerProps {}
export interface DialogContentProps {}
export interface DialogHeaderProps {}
export interface DialogFooterProps {}
export interface DialogTitleProps {}
export interface DialogDescriptionProps {}

export const Dialog: React.FC<DialogProps>;
export const DialogTrigger: React.FC<DialogTriggerProps>;
export const DialogContent: React.FC<DialogContentProps>;
export const DialogHeader: React.FC<DialogHeaderProps>;
export const DialogFooter: React.FC<DialogFooterProps>;
export const DialogTitle: React.FC<DialogTitleProps>;
export const DialogDescription: React.FC<DialogDescriptionProps>;
