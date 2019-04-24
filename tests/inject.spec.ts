import{ Container, Inject, Service } from '../src/index';

beforeEach(() => Container.clear());

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
        @Inject(TestClass) param: TestClass;
    }

    const instance = Container.get(TestClass2);

    expect(instance).toBeInstanceOf(TestClass2);
    expect(instance.param).toBeInstanceOf(TestClass);
});

test('Inject decorator injects new class instance into static property without specifying key', () => {
    @Service()
    class TestClass {
        param: string = 'woohoo';
    }

    class TestClass2 {
        @Inject() static param: TestClass;
    }

    expect(TestClass2.param).toBeInstanceOf(TestClass);
});

test('Inject decorator injects new class instance into class property without specifying key', () => {
    @Service()
    class TestClass {
        param: string = 'woohoo';
    }

    class TestClass2 {
        @Inject() param: TestClass;
    }

    const instance = Container.get(TestClass2);

    expect(instance).toBeInstanceOf(TestClass2);
    expect(instance.param).toBeInstanceOf(TestClass);
});
