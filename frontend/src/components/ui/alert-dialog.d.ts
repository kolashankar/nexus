import * as React from 'react';

export interface AlertDialogProps {}
export interface AlertDialogTriggerProps {}
export interface AlertDialogContentProps {}
export interface AlertDialogHeaderProps {}
export interface AlertDialogFooterProps {}
export interface AlertDialogTitleProps {}
export interface AlertDialogDescriptionProps {}
export interface AlertDialogActionProps {}
export interface AlertDialogCancelProps {}

export const AlertDialog: React.FC<AlertDialogProps>;
export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps>;
export const AlertDialogContent: React.FC<AlertDialogContentProps>;
export const AlertDialogHeader: React.FC<AlertDialogHeaderProps>;
export const AlertDialogFooter: React.FC<AlertDialogFooterProps>;
export const AlertDialogTitle: React.FC<AlertDialogTitleProps>;
export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps>;
export const AlertDialogAction: React.FC<AlertDialogActionProps>;
export const AlertDialogCancel: React.FC<AlertDialogCancelProps>;
