How to use:

1: Provide in app module environment:

````
{      
provide: EnvConfig, 
useValue: {
  ...environment,
  } 
}
````

2: Inject EnvConfig in constructor: 
````
    @Inject(EnvConfig) private envConfig: IEnvConfig,
````
