import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatProgressSpinnerModule, MatSidenavModule,
    MatSlideToggleModule, MatSliderModule, MatButtonToggleModule, MatDividerModule,
    MatTabsModule, MatAutocompleteModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatTabsModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatTabsModule,
    MatAutocompleteModule,
  ]
})
export class MaterialModule { }
