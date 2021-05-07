import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean;
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  onSaveData(): void{
    this.dataStorageService.storeRecipe();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
