# ty~~pescript~~DI

[![npm version](https://img.shields.io/npm/v/@smertos/tydi.svg?color=green&label=tydi&logo=npm&style=for-the-badge)](https://npmjs.com/package/@smertos/tydi)
[![why not](https://img.shields.io/badge/built%20with-nanomachines%20son-brightgreen.svg?style=for-the-badge&logo=typescript)](https://smertos.xyz)

**tydi** is a simple Dependency Injection helper, that adds 2 simple decorators for easy property/constructor parameters injection of decorated classes or any other kind of values using assigned custom keys.


## Example

First you'll need to define some service.

```typescript
import { Service } from '@smertos/tydi';

@Service()
class AuthService {
	
    isLoggedIn(): boolean {
    	return ...;
    }
    	
}
```

Then somewhere you need this service, you'll need to inject the service.

```typescript
import { Container, Inject } from '@smertos/tydi';
import { AuthService } from '...';

class LoginComponent {
	
    @Inject() authService: AuthService;
    
    logIn(): void {
    	if (this.authService.isLoggedIn) return;
        
        ...
    }

}
```

If you do not manage instantiation of class (i.e. React components) and do not pass any arguments, then you can use constructor parameter injection (works like in Angular 2+). Access modificators can be used with injected parameters without any problems.

```typescript
class LoginComponent {
	
    constructor(private authService: AuthService) {}
    
    logIn(): void {
    	if (this.authService.isLoggedIn) return;
        
        ...
    }

}
```

If you wish to do instantiation yourself as well, as pass parameters to constructor, you can do it as it is supported, but TypeScript may think about it otherwise. 
