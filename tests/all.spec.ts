import{ Container, Inject, Service } from '../src/index';

beforeEach(() => Container.clear());

test('Container is defined', () => expect(Container).toBeDefined());
test('Container DI marker is defined', () => expect(Container.injectable).toBeDefined());
test('Inject is defined', () => expect(Inject).toBeDefined());
test('Service is defined', () => expect(Service).toBeDefined());

test('Service adds some secret spices', () => {
    @Service() class TestClass {}

    expect(TestClass).toBeDefined();
    expect(TestClass[Container.injectable]).toBeDefined();
});

test('Service injects another service into constructor argument', () => {
    @Service() class TestClass {
        param: string = 'woohoo';
    }

    @Service() class TestClass2 {
        assss: TestClass;

        constructor(ass: TestClass) {
            this.assss = ass;
        }
    }

    const instance = Container.get(TestClass2);

    expect(TestClass).toBeDefined();
    expect(TestClass2).toBeDefined();
    expect(instance).toBeDefined();
    expect(instance.assss).toBeDefined();
    expect(instance.assss).toBeInstanceOf(TestClass);
    expect(instance.assss.param).toBeDefined();
});

test('Service injects another service into constructor public parameter', () => {
    @Service() class TestClass {
        param: string = 'woohoo';
    }

    @Service() class TestClass2 {
        constructor(public ass: TestClass) {}
    }

    const instance = Container.get(TestClass2);

    expect(TestClass).toBeDefined();
    expect(TestClass2).toBeDefined();
    expect(instance).toBeDefined();
    expect(instance.ass).toBeDefined();
    expect(instance.ass).toBeInstanceOf(TestClass);
    expect(instance.ass.param).toBeDefined();
});

test('Inject decorator injects new class instance into static property', () => {
    class TestClass {
        param: string = 'woohoo';
    }

    class TestClass2 {
        @Inject(TestClass) static param: TestClass;
    }

    expect(TestClass2.param).toBeInstanceOf(TestClass);
});

test('Inject decorator injects new class instance into class property', () => {
    class TestClass {
        param: string = 'woohoo';
    }

    class TestClass2 {
        @Inject(TestClass) param: any;
    }

    const instance = Container.get(TestClass2);

    expect(instance).toBeInstanceOf(TestClass2);
    expect(instance.param).toBeInstanceOf(TestClass);
});
