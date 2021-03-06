import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContextService } from '../../service';
import { Item, ItemSocket, Language } from '../../type';

@Component({
  selector: 'app-item-frame',
  templateUrl: './item-frame.component.html',
  styleUrls: ['./item-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFrameComponent implements OnInit {
  @Input()
  public item: Item;

  @Input()
  public queryItem: Item;

  @Output()
  public queryItemChange = new EventEmitter<Item>();

  @Input()
  public language?: Language;

  @Input()
  public separator = false;

  public properties = [
    'weaponCriticalStrikeChance',
    'weaponAttacksPerSecond',
    'shieldBlockChance',
    'armourArmour',
    'armourEvasionRating',
    'armourEnergyShield',
    'gemLevel',
    'mapTier',
    'mapQuantity',
    'mapRarity',
    'mapPacksize',
    'quality',
    'gemExperience',
  ];

  constructor(private readonly context: ContextService) { }

  public ngOnInit(): void {
    this.language = this.language || this.context.get().language;
  }

  public onPropertyChange(): void {
    this.queryItemChange.emit(this.queryItem);
  }

  public toggleSocketColor(index: number, value: ItemSocket): void {
    this.queryItem.sockets[index] = this.toggleSocket(this.queryItem.sockets[index], value, 'color');
    this.queryItemChange.emit(this.queryItem);
  }

  public toggleSocketLinked(index: number, value: ItemSocket): void {
    this.queryItem.sockets[index] = this.toggleSocket(this.queryItem.sockets[index], value, 'linked');
    this.queryItemChange.emit(this.queryItem);
  }

  public getSocketTop(index: number, offset: number = 0): string {
    return `${Math.floor(index / 2) * 56 + offset}px`;
  }

  public getSocketHeight(): string {
    const length = this.item.sockets.length;
    const socketHeight = Math.floor((length + 1) / 2) * 34;
    const linkHeight = length >= 3
      ? Math.floor((length - 1) / 2) * 22
      : 0;
    return `${socketHeight + linkHeight}px`;
  }

  private toggleSocket(socket: ItemSocket, value: ItemSocket, property: string): ItemSocket {
    if (!socket || !socket[property]) {
      return { ...socket, [property]: value[property] };
    }
    return { ...socket, [property]: null };
  }
}
