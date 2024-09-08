import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockedData = {
    api: 'http://localhost:3000/photos',    // tem que bater com o que está no service
    data: [
        {
            id: 1,
            description: 'example 1',
            src: ''
        },
        {
            id: 2,
            description: 'example 2',
            src: ''
        }
    ]
};

describe(PhotoBoardService.name, () => {

    let service: PhotoBoardService;
    let httpController: HttpTestingController;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PhotoBoardService
            ]
        });

        service = TestBed.inject(PhotoBoardService);
        httpController = TestBed.inject(HttpTestingController);

    });

    afterEach(() => httpController.verify());

    it(`#${PhotoBoardService.prototype.getPhotos.name} should return 
        photos with description in uppercase`, done => {
        service.getPhotos().subscribe(photos => {
            expect(photos[0].description).toBe('EXAMPLE 1');
            expect(photos[1].description).toBe('EXAMPLE 2');
            done();
        });
        // chamada do httpController deve ser depois da chamada do serviço pra poder funcionar
        httpController
            .expectOne(mockedData.api)
            .flush(mockedData.data);
    });

});