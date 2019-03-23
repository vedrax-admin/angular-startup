import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {

    it('Year and version should be defined', () => {

        const comp = new FooterComponent();
        comp.ngOnInit();

        expect(comp.versionInfo).toBeDefined();
        expect(comp.year).toBeDefined();

    });

});