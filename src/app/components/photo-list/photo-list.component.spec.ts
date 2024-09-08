import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';
import { HttpClientModule } from '@angular/common/http';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of } from 'rxjs';

describe(PhotoListComponent.name, () => {

    let fixture: ComponentFixture<PhotoListComponent>;
    let component: PhotoListComponent;
    let service: PhotoBoardService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PhotoListModule,
                HttpClientModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoListComponent);
        component = fixture.componentInstance;
        
        // injetando serviço (disponivel como provider no modulo)
        service = TestBed.inject(PhotoBoardService);

    });

    it(`Should create component`, () => {
        expect(component).toBeTruthy();
    });

    it(`(D) Should display board when data arrives`, () => {

        const photos = buildPhotoList();
        spyOn(service, 'getPhotos')
            .and.returnValue(of(photos));
        // chamar o detectChanges só depois de modificar o retorno do serviço
        fixture.detectChanges();    

        const board = fixture.nativeElement
            .querySelector('app-photo-board');
        const loader = fixture.nativeElement
            .querySelector('.loader');
        
        expect(board)
            .withContext('Should display board')
            .not.toBe(null);
        expect(loader)
            .withContext('Should not display loader')
            .toBe(null);
    });

    it(`(D) Should display loader while waiting for data`, () => {

        const photos = buildPhotoList();
        spyOn(service, 'getPhotos')
            .and.returnValue(null);
        fixture.detectChanges();    

        const board = fixture.nativeElement
            .querySelector('app-photo-board');
        const loader = fixture.nativeElement
            .querySelector('.loader');
        
        expect(board)
            .withContext('Should not display board')
            .toBe(null);
        expect(loader)
            .withContext('Should display loader')
            .not.toBe(null);
    });

});