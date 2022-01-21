import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BaseVisibleTxComponent } from '../../../core/base-component/base-visible-tx.component';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AccountService } from '../../../shared/services/account.service';
import { PostService } from '../../../post/services/post.service';
import { SpaceService } from '../../../space/services/space.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/state';
import { VisibilityService } from '../../../shared/services/visibility.service';
import { filter, mergeMap } from 'rxjs/operators';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hidden-content',
  templateUrl: './hidden-content.component.html',
  styleUrls: ['./hidden-content.component.scss'],
})
export class HiddenContentComponent
  extends BaseVisibleTxComponent
  implements OnInit
{
  @Input() type: 'post' | 'space' | 'comment';
  @Input() id: string;

  constructor(
    public transaction: TransactionService,
    public account: AccountService,
    public cd: ChangeDetectorRef,
    public visibility: VisibilityService
  ) {
    super(transaction, account, cd, visibility);
  }

  hidden$: Observable<boolean>;
  spaceHidden$: Observable<boolean>;

  ngOnInit(): void {
    this.entityId = this.id;
    this.visibleOperationType = this.type === 'comment' ? 'post' : this.type;

    if (this.visibleOperationType === 'post') {
      this.hidden$ = this.visibility.getIsPostHidden(this.id);
      this.spaceHidden$ = this.visibility.getIsSpaceHiddenByPostId(this.id);
    } else if (this.visibleOperationType === 'space') {
      this.hidden$ = this.visibility.getIsSpaceHidden(this.id);
    }
  }
}
