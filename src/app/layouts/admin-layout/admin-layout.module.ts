import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '@app/pages/upgrade/upgrade.component';
import { ClientComponent } from '@app/pages/client/client.component';
import { ArticleComponent } from '@app/pages/article/article.component';
import { StoreComponent } from '@app/pages/store/store.component';
import { ClientArticleComponent } from '@app/pages/client-article/client-article.component';
import { StoreArticleComponent } from '@app/pages/store-article/store-article.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from  '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ClientComponent,
    ArticleComponent,
    StoreComponent,
    ClientArticleComponent,
    StoreArticleComponent,

  ],
  providers:[]
})

export class AdminLayoutModule { }
