import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientComponent } from '../../pages/client/client.component';
import { StoreComponent } from '../../pages/store/store.component';
import { ArticleComponent } from '../../pages/article/article.component';
import { StoreArticleComponent } from '@app/pages/store-article/store-article.component';
import { ClientArticleComponent } from '@app/pages/client-article/client-article.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'client', component: ClientComponent },
    { path: 'store', component: StoreComponent },
    { path: 'article', component: ArticleComponent },
    { path: 'client-article', component: ClientArticleComponent },
    { path: 'store-article', component: StoreArticleComponent },
];

