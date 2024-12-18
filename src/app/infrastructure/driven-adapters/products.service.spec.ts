import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service"
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { environment } from "@environment/environment";
import { getProductsResponseMock } from "@/core/mocks/products.mock";

describe('ProductsService', () => {
    let service: ProductsService;
    let httpController: HttpTestingController; // Mock the data coming from the API
    const baseUrl = environment.serviceUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })

        service = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpController.verify();
    })

    test('should create', () => {
        expect(service).toBeTruthy();
    })

    test('should get the products', (done) => {
        const response = getProductsResponseMock();
        const {id, title, price, description, category, image} = response[0];
        const expectedResponse = [{
            id,
            name: title,
            price,
            description,
            category,
            image
        }]

        service.getProducts().subscribe(res => {
            expect(res).toEqual(expectedResponse);
            done();
        });

        const request = httpController.expectOne(`${baseUrl}/products`);
        request.flush(response);
    });

    test('should get a single product', (done) => {
        const product = getProductsResponseMock()[0];
        const productId = 1;
        const {id, title, price, description, category, image} = product;
        const expectedResponse = {
            id,
            name: title,
            price,
            description,
            category,
            image
        }

        service.getProductById(productId).subscribe(res => {
            expect(res).toEqual(expectedResponse);
            done();
        });

        const request = httpController.expectOne(`${baseUrl}/products/${productId}`)
        request.flush(product);
    })
})