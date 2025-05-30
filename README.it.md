# Definitely Typed

> La repo per le definizioni di tipi Typescript di _alta qualità_.

_Puoi leggere questo README anche in [Spagnolo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.es.md), [Coreano](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ko.md), [Russo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ru.md), [Cinese](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.zh-Hans.md), [Portoghese](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.pt.md) e [Giapponese](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ja.md)!_

_Link per il [manuale dell'amministratore](./docs/admin.md)_

## Stato attuale

Questa sezione tiene traccia della salute della repository e dello stato di pubblicazione.
Può tornare utile per i contributori che stanno avendo problemi con le loro PR e package.

- Ultima build [type-checked/linted](https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/dtslint) pulita: [![Build status](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/CI.yml/badge.svg?branch=master&event=push)](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/CI.yml?query=branch%3Amaster+event%3Apush)
- Tutti i package sono sottoposti a controllo dei tipi e linting con typescript@next: [![Build status](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/CI.yml/badge.svg?branch=master&event=schedule)](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/CI.yml?query=branch%3Amaster+event%3Aschedule)
- Tutti i package vengono [pubblicati su npm](https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/publisher) in meno di un'ora e mezza: [![Publish Status](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/watchdog-publisher.yml/badge.svg)](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/watchdog-publisher.yml)
- Il [bot di Typescript](https://github.com/typescript-bot) è stato attivo su Definitely Typed: [![Activity Status](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/watchdog-typescript-bot.yml/badge.svg)](https://github.com/DefinitelyTyped/DefinitelyTyped/actions/workflows/watchdog-typescript-bot.yml)
- [Aggiornamenti dello stato dell'infrastruttura](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/44317) attuale

Se qualcosa sembra sbagliato o una qualunque delle cose qui in alto fallisce, fatecelo sapere [sul canale di Definitely Typed nel server discord della comunità di Typescript](https://discord.gg/typescript):

## Cosa sono i file di dichiarazione e come li ottengo

Leggi il [manuale di TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

### npm

Il metodo preferito per installarli è usando npm.

Ad esempio:

```sh
npm install --save-dev @types/node
```

I tipi dovrebbero poi essere inclusi automaticamente dal compilatore.
Potresti dover aggiungere una `types` reference se non stai usando i moduli:

```ts
/// <reference types="node" />
```

Approfondisci leggendo il [manuale](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

Per un package "pippo", i tipi associati saranno disponibili sul package "@types/pippo".
Se non riesci a trovare i tipi di un package, cercalo su [TypeSearch](https://microsoft.github.io/TypeSearch/).

Se ancora non riesci a trovarlo, vuol dire che sono [inclusi](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) nel package stesso.
Di solito vengono specificati nel campo `"types"` o `"typings"` nel `package.json`;
oppure prova a cercare per dei file ".d.ts" nel package ed includerli manualmente con `/// <reference path="" />`.

### Support window

"Definitely Typed" testa packages solo su versioni di TypeScript che hanno meno di due anni.

<img src="docs/support-window.svg#gh-light-mode-only" style="width:100%">
<img src="docs/support-window.svg#gh-dark-mode-only" style="width:100%">

<details>
<summary>Versioni precedenti di TypeScript</summary>

I package `@types` hanno dei tag per indicare le specifiche versioni di TypeScript che supportano, quindi di solito puoi installare versioni precedenti di package seppur precedenti alla finestra dei due anni.
Ad esempio se esegui `npm dist-tags @types/react`, vedrai che TypeScript 2.5 potrà usare i tipi per react@16.0, mentre TypeScript 2.6 e 2.7 potranno usare i tipi per react@16.4:

| Tag    | Versione |
| ------ | -------- |
| ultima | 16.9.23  |
| ts2.0  | 15.0.1   |
| ...    | ...      |
| ts2.5  | 16.0.36  |
| ts2.6  | 16.4.7   |
| ts2.7  | 16.4.7   |
| ...    | ...      |

#### TypeScript 1.*

- Scarica manualmente la branch `master` di questa repo e collocala nel tuo progetto.
- ~~[Typings](https://github.com/typings/typings)~~ (usa altre alternative migliori, in quanto typings è deprecata)
- ~~[NuGet](https://nuget.org/packages?q=DefinitelyTyped)~~ (usa altre alternative, in quanto la pubblicazione di tipi su nuget DT non è più possibile)

Potresti dover aggiungere manualmente le [reference](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html).

</details>

## Come posso contribuire?

"Definitely Typed" deve il suo successo e la sua funzionalità solo grazie a contributori come te!

### Testing

Prima di condividere il tuo miglioramento col mondo intero, utilizza i tipi tu stesso attraverso la creazione del file `typename.d.ts` nel tuo progetto per poi riempire il suo export:

```ts
declare module "libname" {
    // Types inside here
    export function helloWorldMessage(): string;
}
```

#### Test per la modifica di un package già esistente

Puoi modificare i tipi direttamente in `node_modules/@types/foo/index.d.ts` per verificare i tuoi cambiamenti, successivamente puoi portare questi cambiamenti a questa repository attraverso gli step descritti qui sotto.

In alternativa puoi usare [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) per estendere i tipi esistenti del modulo DT oppure usare la tecnica `declare module` qui sopra che andrà a sovrascrivere la versione presente nei `node_modules`.

#### Test per un nuovo package

Aggiungi al tuo `tsconfig.json`:

```json
"baseUrl": "types",
"typeRoots": ["types"],
```

Crea un `types/foo/index.d.ts` contenente le dichiarazioni per il tuo modulo "pippo".
Ora dovresti essere in grado di importare `"pippo"` nel tuo codice, con i tipi riferiti alle dichiarazioni che hai appena creato.
Poi fai una build **ed** esegui il codice per essere sicuro che le definizioni dei tipi corrispondano effettivamente a ciò che accade a runtime.

Una volta che hai testato le definizioni su del codice reale, fai una [Pull Request](#fai-una-pull-request)
e poi segui le istruzioni per [modificare un package preesistente](#modificare-un-package-preesistente] o [creare un nuovo package](#creare-un-nuovo-package).

### Fai una pull request

Una volta che hai testato il tuo package, puoi condividerlo su "Definitely Typed".

Inanzitutto, fai il [fork](https://guides.github.com/activities/forking/) di questa repository, [clonala](#clone-parziale), installa [node](https://nodejs.org/) ed esegui `npm install`. Se stai usando `npm` v7 devi aggiungere anche la flag `--legacy-peer-deps`.

Facciamo uso di un bot per far sì che un gran numero di pull request su Definitely Typed possano essere gestite interamente in modo autonomo. Puoi scoprire di più a riguardo di come e perchè [qui](https://devblogs.microsoft.com/typescript/changes-to-how-we-manage-definitelytyped/).

Ecco qui un'immagine che mostra il ciclo vitale di una pull request su Definitely Typed.

<img src="https://github.com/microsoft/DefinitelyTyped-tools/tree/main/packages/mergebot/docs/dt-mergebot-lifecycle.svg">

#### Clone parziale

Puoi clonare l'intera repo [come di consuetudine](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) che però è molto grande ed include numerose cartelle di package di tipi. Ci vorrà quindi del tempo per clonarla e può essere un procedimento inutilmente lungo.
Per clonare la repo in modo più agibile, clonando _solo_ i package per te rilevanti, pui usare le funzionalità [`sparse-checkout`](https://git-scm.com/docs/git-sparse-checkout), [`--filter`](https://git-scm.com/docs/git-rev-list#Documentation/git-rev-list.txt---filterltfilter-specgt) ed [`--depth`](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) di git.

> :warning: Richiede almeno la [versione di git 2.27.0](https://git-scm.com/downloads), che solitamente è più recente di quelle installate di default. Per le versioni più vecchie sono disponibili procedure più complesse, che non trattiamo qui.

1. `git clone --sparse --filter=blob:none --depth=1 <forkedUrl>`
   - `--sparse` initializes the sparse-checkout file so the working directory starts with only the files in the root of the repository.
     - `--filter=blob:none` will exclude files, fetching them only as needed.
     - `--depth=1` will further improve clone speed by truncating commit history, but it may cause issues as summarized [here](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/).
   2. `git sparse-checkout add types/<type> types/<dependency-type> ...`

#### Modificare un package preesistente

- `cd types/<package to edit>`
- Fai le tue modifiche. Ricorda di [testle](#mio-package-teststs).
  Se fai modifiche essenziali, non ti dimenticare di [aggiornare il major della versione](#se-laggiornamento-di-una-libreria-comprende-modifiche-sostanziali-aggiornamento-major-come-faccio-ad-aggiornare-il-suo-pacchetto-types).
  - [Esegui `npm test <package da testare>`](#eseguire-test).

Quando crei una pull request ad un package che esiste già, `dt-bot` dovrebbe @menzionare gli autori precedenti.
Se non lo fa, puoi farlo direttamente tu nel commento associato alla pull request.

#### Creare un nuovo package

Se sei l'autore della libreria ed il tuo package è scritto in TypeScript, [includi i file di dichiarazione generati automaticamente](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) nel tuo package invece di pubblicarli su Definitely Typed.

Se stai aggiungendo i tipo per un package npm, crea una cartella con lo stesso nome.
Se il package a cui stai aggiungendo i tipi non è su npm, assicurati che il nome che scegli non entri in conflitto con quello di un package npm.
(Puoi usare `npm info <nome-package>` per verificare l'esistenza del package `<nome-package`).

Il tuo package dovrebbe avere questa struttura:

| File                                              | Scopo                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.d.ts`                                      | Contiene le dichiarazioni dei tipi del package.                                                                                              |
| [`<nome-package>-tests.ts`](#mio-package-teststs) | Contiene codice di esempio con test delle dichiarazioni dei tipi. Se il codice _non_ funziona anche se viene traspilato da tsc senza errori. |
| [`tsconfig.json`](#tsconfigjson)                  | Ti permette di eseguire `tsc` all'interno del package.                                                                                       |

Generali eseguento `npx dts-gen --dt --name <mio-package> --template module` se hai npm ≥ 5.2.0, altrimenti `npm install -g dts-gen` and `dts-gen --dt --name <my-package> --template module`.
Leggi tutte le opzioni su [dts-gen](https://github.com/microsoft/DefinitelyTyped-tools/tree/main/packages/dts-gen).

Se hai file `.d.ts` oltre all'`index.d.ts`, assicurati che siano referenziati o nell'`index.d.ts` o nei test.

I membri di Definitely Typed controllano continuamente le nuove pull request, perciò sii al corrente che un alto numero di pull request potrebbe rallentarci il lavoro.

Per l'esempio di un buon package, guarda [base64-js](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/a2ff1d2088143cbacc15786c7f3b0ec67179523c/types/base64-js).

#### Rimuovere un package

Quando un package [include](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) i suoi dichiarazioni, esse dovrebbero venire rimosse da Definitely Typed per evitare di far confusione.

Puoi rimuoverli eseguendo `pnpm run not-needed -- <nome-package> <versione> [<nome-libreria>]`.

- `<nome-package>`: È il nome della cartella da rimuovere.
- `<versione>`: Verrà pubblicato uno stab su `@types/<nome-package>` con questa versione. Dev'essere più alto della versione attualmente pubblicata e deve essere una versione di `<ome-libreria>` su npm.
- `<nome-libreria>`: Nome del package npm che sostituisce il package DT. Solitamente è identioc a `<nome-package>` e puoi ometterlo.

Qualunque altro package di Definitely Typed che si riferisce ad un altro package DT eliminato dovrebbe venir aggiornato facendolo riferire ai tipi inclusi nel package stesso.
Puoi farlo controllando gli errori che escono eseguendo `pnpm run test-all`.
Per correggere gli errori, [aggiungi un `package.json`](#packagejson) con `"dependencies": { "<nome-libreria>": "x.y.z" }`.
Ad esempio:

```json
{
    "private": true,
    "dependencies": {
        "<nome-libreria>": "^2.6.0"
    }
}
```

Quando aggiungi un `package.json` a dei package che dipendono da `<nome-libreria>`, devi aprire anche una pull request per aggiungere `<nome-libreria>` [ad allowedPackageJsonDependencies.txt su DefinitelyTyped-tools](https://github.com/microsoft/DefinitelyTyped-tools/blob/master/packages/definitions-parser/allowedPackageJsonDependencies.txt).

Se un package non è mai stato su Definitely Typed, non c'è bisogno che venga aggiunto a `notNeededPackages.json`.

#### Eseguire test

Testa le tue modifiche eseguendo `npm test <package da testare>` dove `<package da testare>` è il nome del tuo package.

Lo script usa [dtslint](https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/dtslint) per eseguire il compilatore TypeScript sui tuoi file dts.

#### Nomenclatura

Se stai aggiungendo i tipi ad un package npm, crea una cartella con lo stesso nome.
Se invece non li stai aggiungendo ad un package npm, assicurati prima che non esista un package npm con lo stesso nome, per evitare futuri conflitti.
(Puoi usare `npm info <nome-package>` per controllare l'esistenza di un package `<nome-package>`).

Se un package che non è di npm è in conflitto con un package npm, prova ad aggiungere -browser alla fine del nome, ottenendo quindi `<mio-package>-browser`

#### `<mio-package>-tests.ts`

Ci dev'essere un file `<my-package>-tests.ts`, che viene considerato il tuo file di test, assieme ad ogni file `*.ts` che importa.
Se non vedi un file di test nella cartella del modulo, crea tu un file `<nome-package>-test.ts`.
Questi file sono usati per validare l'API esportata dai file `*.d.ts` che vengono pubblicati come `@types/<nome-package>`.

Ad esempio, questo codice cambia una funzione nel file `.d.ts`, aggiungendoci un nuovo parametro:

`index.d.ts`:

```diff
- export function twoslash(body: string): string
+ export function twoslash(body: string, config?: { version: string }): string
```

`<mio-package>-tests.ts`:

```diff
import {twoslash} from "./"

// $ExpectType string
const result = twoslash("//")

+ // Handle options param
+ const resultWithOptions = twoslash("//", { version: "3.7" })
+ // When the param is incorrect
+ // @ts-expect-error
+ const resultWithOptions = twoslash("//", {  })
```

Se ti stai chiedendo da dove cominciare per fare i test, gli esempi nel README del modulo sono un buon punto da dove partire.

Puoi [validare le tue modifiche](#eseguire-test) con `npm test <package da testare>` nella root di questa repo, che prende in considerazione i file cambiati.
Usa `$ExpectType` per asserire che un'espressione è del tipo dato e `@ts-expect-error` per asserire un errore di compilazione. Ad esempio:

```js
// $ExpectType void
f(1);

// @ts-expect-error
f("one");
```

Per maggiori dettagli, leggi il readme di [dtslint](https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/dtslint#write-tests).

##### Linter: `.eslintrc.json`

Dovresti disabilitare le regole solo per determinate linee:

```ts
// eslint-disable-next-line no-const-enum
const enum Const {
    One,
}
const enum Enum { // eslint-disable-line no-const-enum
    Two,
}
```

Puoi ancora disabilitare determinate regole attraverso il file .eslintrc.json ma non dovresti nei nuovi package.

#### `tsconfig.json`

`tsconfig.json` dovrebbe avere `noImplicitAny`, `noImplicitThis`, `strictNullChecks` e `strictFunctionTypes` settati a `true`.

Potresti dover editare `tsconfig.json` per aggiungere nuovi file di test, per aggiungere le opzioni di traspilazione `"target": "es6"` (necessario per funzioni asincrone), `"lib"` o `"jsx"`.

##### `esModuleInterop`/`allowSyntheticDefaultImports`

Riassunto: `esModuleInterop` e `allowSyntheticDefaultImports` _non sono permessi_ nel tuo `tsconfig.json`.

> Queste opzioni rendono possibile lo scrivere un default import per un CJS export, andando ad alterare l'interoperabilità tra CJS ed i moduli ES in Node ed in alcuni bundler JS:
>
> ```tsx
> // component.d.ts
> declare class Component {​​​​​}​​​​​
> // CJS export, modeling `module.exports = Component` in JS
> export = Component;
>
> // index.d.ts
> // ESM default import, only allowed under 'esModuleInterop' or 'allowSyntheticDefaultExports'
> import Component from "./component";
> ```
>
> Siccome la validità durante la compilazione dell'import in `index.d.ts` dipende da specifiche impostazioni di compilazione, che gli utenti che utilizzeranno i tuoi tipi non avranno, un utilizzo di questa modalità in DefinitelyTyped obbligherebbe gli utenti a modificare le loro impostazioni di compilazione, che potrebbero essere incorrette per il loro runtime. Invece, devi scrivere un import CJS per un export CJS per garantire una compatibilità diffondibile e indipendente da configurazioni specifiche:
>
> ```ts
> // index.d.ts
> // CJS import, modeling `const Component = require("./component")` in JS
> import Component = require("./component");
> ```

#### `package.json`

Solitamente non ne avrai bisogno.
Un `package.json` potrebbe essere incluso per specificare le dipendenze che non sono altri `@types` package.
[Pikaday ne è un buon esempio](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pikaday/package.json).
Anche se stai scrivendo un tuo `package.json`, puoi solo specificare dipendenze; altri campi come `"description"` non sono consentiti.
Potresti anche aver bisogno di aggiungere una dipendenza alla [lista dei package consentiti](https://github.com/microsoft/DefinitelyTyped-tools/blob/master/packages/definitions-parser/allowedPackageJsonDependencies.txt).
Questa lista è aggiornata da persone, che ci danno l'opportunità di assicurarci che i package `@types` non dipendono da package rischiosi.
Nel raro caso in cui un package `@types` viene eliminato a favore dei tipi inclusi nel package npm analogo e avessi bisogno di dipendere dal vecchio package `@types`, puoi aggiungere una dipendenza ad un package `@types`.
Assicurati di spiegare tutto ciò quando lo aggiungi alla lista dei package consentiti cosicchè gli altri possano capire cosa stai facendo.

#### `OTHER_FILES.txt`

Se un file non è nè testato nè riferito nell'`index.d.ts`, aggiungilo in un file chiamato `OTHER_FILES.txt`. Questo file è una lista di altri file che serve che siano inclusi nel package DT. Elencali uno per riga.

#### Errori comuni

- Inanzitutto segui i consigli nel [manuale](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html).
- Formattazione: Usa 4 spazi. Prettier è abilitato su questa repo, quindi puoi eseguire `pnpm run prettier -- --write 'path/to/package/**/*.ts'`. [Quando usi le assertion](https://github.com/SamVerschueren/tsd#assertions), aggiungi `// prettier-ignore` per marcare le linee di codice da escludere quando si fa la formattazione:

  ```tsx
  // prettier-ignore
  // @ts-expect-error
  const incompleteThemeColorModes: Theme = { colors: { modes: { papaya: {
  ```

- `function sum(nums: number[]): number`: Usa `ReadonlyArray` se una funzione non modifica i suoi parametri.
- `interface Foo { new(): Foo; }`:
  Definisce un tipo di oggetto su cui si può fare new. Probabilmente ciò che vuoi è `declare class Foo { constructor(); }`.
- `const Class: { new(): IClass; }`:
  Preferire sempre la dichiarazione di una classe `class Class { constructor(); }` al posto di una costante new.
- `getMeAT<T>(): T`:
  Se il parametro di un tipo non appare nei tipi di un parametro, ciò che vuoi non è una vera funzione generica.
  È consigliato usare una vera asserzione di tipo, ad esempio `getMeAT() as number`.
  Esempio dove un parametro è accettabile: `function id<T>(value: T): T;`.
  Esempio in cui non lo è: `function parseJson<T>(json: string): T;`.
  Eccezione: `new Map<string, number>()` va bene.
- Usare i tipi `Function` e `Object` non è quasi mai una buona idea. Nel 99% si può specificare un tipo più preciso. Alcuni esempi sono `(x: number) => number` per le [funzioni](https://www.typescriptlang.org/docs/handbook/functions.html#function-types) e `{ x: number, y: number }` per gli oggetti. Se non si è sicuri del tipo, [`any`](https://www.typescriptlang.org/docs/handbook/basic-types.html#any) è la scelta migliore, non `Object`. Se l'unica cosa di cui si sa è che il tipo è un oggetto di qualche tipo, usa il tipo [`object`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type), non `Object` o `{ [key: string]: any }`.
- `var foo: string | any`:
  Quando `any` è usato in un tipo disgiuntipo, il tipo risultanto rimane `any`. Quindi mentre la porzione `string` di questo tipo potrebbe _sembrare_ utile, in realtà non offre nessuna precisazione rispetto ad un banalissimo `any`.
  In funzione delle tue intenzioni, delle alternative accettabili sono `any`, `string` o `string | object`.

### Proprietari delle definizioni

> Riassiunto: non modificare il file `.github/CODEOWNERS`, modifica invece la lista dei proprietari nell'header del file `index.d.ts`

DT ha il concetto di "Proprietari delle definizioni", che sono coloro i quali vogliono mantenere la qualità delle definizioni dei tipi di un certo modulo.

- Aggiungerti da solo farà sì che tu venga notificato (tramite il tuo nome utente GitHub) ogni volta che qualcuno fa una pull request o un issue su quel package.
- Le tue PR review avranno precedenza maggiore di quelle [dei bot](https://github.com/microsoft/DefinitelyTyped-tools/tree/main/packages/mergebot) che mantengono questa repo.
- I mantenitori di DT stanno ponendo la loro fiducia sui proprietari delle definizioni per mantenere un ecosistema stabile, quindi non aggiungerti senza sapere quello che fai.

Per aggiungerti come pprietario delle definizioni:

- Aggiungi il tuo nome alla fine della riga, come su `// Definitions by: Alice <https://github.com/alice>, Bob <https://github.com/bob>`.
- Se ci sono più perone, puoi separarlo in più righe:
  ```typescript
  // Definitions by: Alice <https://github.com/alice>
  //                 Bob <https://github.com/bob>
  //                 Steve <https://github.com/steve>
  //                 John <https://github.com/john>
  ```

Una volta alla settimana i proprietari delle definizioni saranno sincronizzati nel file [.github/CODEOWNERS](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/.github/CODEOWNERS) che è la nostra fonte di verità.

## Domande frequenti

#### Come si relaziona questa repo con i package `@types` su npm?

Il branch `master` viene pubblicato automaticamente nello scope `@types` di npm grazie a [DefinitelyTyped-tools](https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/publisher).

#### Ho inviato una pull request. Quanto ci vuole prima del merge?

Dipende, ma alla maggior parte delle pull request viene fatto un merge in meno di una settimana.
Ad altre pull request può essere fatto il merge dai proprietari di un modulo e ciò può avvenire molto più velocemente.
Quindi dipende, anche se la maggior parte dei merge avvengono nell'arco di una settimana. Approssimativamente possiamo dire che:

> Le pull request che cambiano solo i tipi di un modulo e che hanno i test corrispondenti vengono vengono accettati più velocemente

Alle pull request che sono state approvate da un'autore presente nella lista dei proprietari vengono di solito fatti i merge più rapidamente; le pull request che introducono nuove definizioni ci mettono più tempo in quanto hanno bisogno di più controlli da parte dei mantenitori. Ogni pull request viene controllata da un membro di TypeScript o Definitely Type prima di ottenere un merge, quindi abbi pazienza in quanto fattori umani possono causare ritardi. Leggi la [Pull Request Status Board](https://github.com/orgs/DefinitelyTyped/projects/1) per vedere a che punto sono i mantenitori nel controllare le pull request.

#### La mia pull request ha ottenuto un merge; quand'è che il package `@types` verra aggiornato su npm?

I package dovrebbero venire aggiornati us npm in pochi minuti. Se ci mette più di un'ora, riferisciti al numero della pull request sul [serve discord di DefinitelyTyped nella community di TypeScript](https://discord.gg/typescript) ed il mantenitore assegnerà a chi di dovere per investigare.

#### Mi piacerebbe inviare un contributo ad un progetto molto popolare, perchè sono trattati in modo differente?

Per cambiamenti a moduli molto popolari, come Node/Express/Jest che hanno milioni di download ogni settimana su npm, i requisiti per contribuire sono leggermente più esigenti.
Una variazione a progetti del genere può avere un effetto significativo sull'intero ecosistema, per questa ragione trattiamo questi cambiamenti con moltissima attenzione.
Questi moduli richiedono una approvazione sia dal mantainer del package che una risposta eccezionale da parte dei proprietari dei moduli. L'asticella per superare questo requisito può essere abbastanza alta e difatti spesso le Pull Request vanno in stallo proprio data l'assenza di un champion.
Se noti che nessuno interagisce alla PR prova a darle un focus minore.

#### Sto scrivendo un file dts che dipende da altri dts. Cosa dovrei usare, `<reference types="" />` o `import`?

Se il modulo da cui dipendi è un modulo esterno (usa `export`), utilizza `import`.
Se il modulo da cui dipendi è un modulo d'ambiente (usa `declare module` o semplicemente dichiara le cose globali), usa `<reference types="" />`.

#### Alcuni package non hanno un `tslint.json` ed ad altri mancano il `"noImplicitAny": true`, il `"noImplicitThis": true`, o il`"strictNullChecks": true` nel `tsconfig.json`.

Questo significa che non vanno bene e noi non ce ne siamo ancora accorti. Puoi contribuire inviando una pull request che li sistemi.

#### Posso cambiare/imporre una specifica formattazione per alcuni moduli?

No. Abbiamo già provato ad avere una formattazione consistente dei package ma siamo arrivati ad un vicolo cieco data la mole di attività sulla repo. Noi alleghiamo delle impostazioni di formattazione attraverso i file [`.editorconfig`](.editorconfig). Questi sono esclusivamente per il tuo editor, le loro impostazioni non vanno in conflitto e non abbiamo in piano di modificarle. Né tantomeno abbiamo in piano di imporre uno stile specifico nella repository. Vogliamo tenere le barriere per le contribuzioni basse.

#### Posso chiedere che venga implementata una definizione per un modulo che non le ha ancora?

Se un modulo che utilizzi non ha ancora delle definizioni, puoi chiedere che vengano implementate aprendo un Issue. Qui trovi le [richieste di implementazione](https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/categories/request-a-new-types-package) attuali.

#### E per le definizioni dei tipi del DOM?

Se i tipi fanno parte di uno standard web, si può contribuire al [TSJS-lib-generator](https://github.com/Microsoft/TSJS-lib-generator), in modo tale che diventino parte del `lib.dom.d.ts` ufficiale.

#### È consigliato aggiungere un namespace vuoto ai package che non esportano un modulo, così da poter usare gli import ES6?

Alcuni package, come [chai-http](https://github.com/chaijs/chai-http), esportano una funzione.

Importare questo modulo tramite un import ES6 nella forma `import * as pippo from "pippo";` restituisce questo errore:

> error TS2497: Module 'foo' resolves to a non-module entity and cannot be imported using this construct

Questo può essere risolto fondendo la dichiarazione della funzione con un namespace vuoto dello stesso nome, ma di norma va evitato.
Questa [risposta su Stack Overflow](https://stackoverflow.com/questions/39415661/what-does-resolves-to-a-non-module-entity-and-cannot-be-imported-using-this) è tipicamente citata quando si parla di problemi di questo tipo.

Risulta preferibile importare un modulo usando la sintassi `import foo = require("foo");`.
In ogni caso, se vuoi usare un import default come `import foo from "foo";`, hai due possibilità:

- puoi usare l'opzione del traspilatore TypeScript [`--allowSyntheticDefaultImports`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#support-for-default-import-interop-with-systemjs) se il tuo modulo supporta a ntime

Importare il modulo usando la sintassi `import foo = require("foo");` è più appropriato.
Comunque, se vuoi usare un default import come `import foo from "foo";` hai due possibilità:

- puoi usare [l'opzione di compilazione `--allowSyntheticDefaultImports`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#support-for-default-import-interop-with-systemjs) se il tuo ambiente di runtime supporta uno schema interop per moduli non ECMAScript, come nel caso in cui gli import di default sono supportati (Webpack, SystemJS, esm, ...)
- puoi usare [l'opzione di compilazione `--esModuleInterop`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-form-commonjs-modules-with---esmoduleinterop) se sia Typescript ad occuparsi dell'interop di moduli non ECMAScript (da TypeScript 2.7 in su).

#### Un package usa `export =`, ma preferirei usare un import di default. Posso cambiare `export =` in `export default`?

Come già scritto nella risposta precedente, fai riferimento alle opzioni di compilazione [`--allowSyntheticDefaultImports`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#support-for-default-import-interop-with-systemjs)
e [`--esModuleInterop`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-form-commonjs-modules-with---esmoduleinterop).

Non cambiare la definizione di tipo se è apposita.
Per un package npm, `export =` è apposita se `node -p 'require("foo")'` funziona per importare un modulo, mentre `export default` è apposita se funziona `node -p 'require("foo").default'`.

#### Voglio usare le funzionalità delle versioni più nuove di Typescript

Allora devi aggiungere un commento all'ultima riga del tuo header di definizione (dopo `// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped`): `// Minimum TypeScript Version: X.Y`. Ciò specificherà la versione minima supportata.

In ogni caso, se il tuo progetto avesse bisogno di mantenere tipi compatibili con, ad esempio, versioni 3.7 e successive ed **allo stesso tempo** vesioni 3.6 o precedenti, dovrai usare la funzionalità `typesVersions`.
Puoi trovare una spiegazione nel dettaglio di questa funzionalità nella [documentazione ufficiale di Typescript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#version-selection-with-typesversions).

Ecco qui un breve esempio per iniziare:

1. Aggiungi un file `package.json` alle definizioni dei tuoi package, con il contenuto seguente.

   ```json
   {
       "private": true,
       "types": "index",
       "typesVersions": {
           "<=3.6": { "*": ["ts3.6/*"] }
       }
   }
   ```

2. Crea la sottocartella menzionata dal campo `typesVersions` dentro la tua cartella dei tipi (che nel nostro esempio è `ts3.6/`).
   `ts3.6/` suppporterà le versioni uguali o inferiori alla 3.6, quindi copia i tipi esistenti con i test lì.

   Dovrai eliminare l'header delle definizioni da `ts3.6/index.d.ts` dal momento che solo la root `index.d.ts` può averlo.

3. Cambia le opzioni `baseUrl` e `typeRoots` in `ts3.6/tsconfig.json` per correggere i path, dovrebbe essere simile a:

   ```json
   {
       "compilerOptions": {
           "baseUrl": "../../",
           "typeRoots": ["../../"]
       }
   }
   ```

4. Nel root del package, aggiungi le funzionalità di Typescript 3.7 che vuoi usare.
   Quando il package viene installato, Typescript 3.6 o inferiore partirà da `ts3.6/index.d.ts`, mentre Typescript 3.7 o superiore partirà da `index.d.ts`.

   Dai un'occhiata a [bluebird](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/f2512c2cf7cdcf9a487d989e288174e49b7839ab/types/bluebird) per averne un esempio.

#### Voglio aggiungere una API DOM che non è presente di default su Typescript

Questo potrebbe riguardare [TSJS-Lib-Generator](https://github.com/Microsoft/TSJS-lib-generator#readme). Dai un'occhiata a quelle guide.
Se lo standard è ancora una bozza, allora riguarda questa repo.
Usa un nome che comincia per 'dom-' ed includi un collegamento allo standard come il collegamento "Project" nell'header.
Quando smetterà di essere una bozza, potremo rimuoverlo da Definitely Typed e deprecare il package `@types` associato.

#### Come fanno le versioni dei package Definitely Typed a coincidere con le versioni della libreria corrispondente?

_NOTA: Questa sezione assume familiarità con [Versioni semantiche](https://semver.org/)_

Ogni pacchetto Definitly Typed è versionato quando viene pubblicato su npm.
Il [DefinitelyTyped-tools](https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/publisher), che è lo strumento che pubblica i pacchetti `@types` su npm) metterà la versione al pacchetto '@types`usando la versione`major.minor`scritta nella prima riga del suo file`index.d.ts`. Ad esempio, queste sono le prime righe delle [dichiarazioni di tipi di Node](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1253faabf5e0d2c5470db6ea87795d7f96fef7e2/types/node/index.d.ts) for version`10.12.x` at the time of writing:

```js
// Type definitions for Node.js 10.12
// Project: https://nodejs.org/
// Definitions by: Microsoft TypeScript <https://github.com/Microsoft>
//                 Definitely Typed <https://github.com/DefinitelyTyped>
//                 Alberto Schiabel <https://github.com/jkomyno>
```

Siccome c'è `10.12` alla fine della prima riga commentata, la versione del pacchetto npm `@types/node` sarà `10.12.x`.
Nota bene che la prima riga commentata del `index.d.ts` deve contenere solo le prime due parti (`major.minor`) della versione (come `10.12`), senza contenere la terza parte "patch" della versione (come `10.12.4`).
Questo è naturale, in quanto solo aggiornamenti delle parti `major.minor` della versione possono comportare variazioni delle definizioni e sono quindi allineate con la versione del pacchetto `@types`.
La parte patch del pacchetto `@types` (come `.0` in `10.12.0`) viene inizializzato a zero da Definitely Typed e viene incrementato di uno ogni volta che un nuovo pacchetto `@type`, con la stessa versione `major.minor`, viene pubblicato su npm per la stessa libreria.

A volte le versioni delle dichiarazioni dei tipi e quelle dei pacchetti corrispondenti può desincronizzarsi.
Qui sotto ci sono alcune delle cause più comuni, ordinate in base a quanti inconvenienti causano a chi utilizza la libreria.
Solitamente, solo l'ultima causa da problemi.

- Come messo precedentemente in evidenza, la parte patch della versione del pacchetto `@types` non è allineata con quella della libreria analoga.
  Questo permette a Definitely Typed di aggiornare in modo automatico e sicuro le dichiarazioni dei tipi di una libreria che hanno le stesse major/minor.
- Se aggiorni un pacchetto perchè introduci una nuova funzionalità, ricordati di aggiornare la versione anche sul pacchetto `@types`.
  Se gli autori dei pacchetti fanno corrispondere le versioni di JavaScript con quelle dei pacchetti `@types` analoghi, `npm update` dovrebbe funzionare alla perfezione.
- Molto spesso capita che le versioni delle dichiaraizoni dei tipi rimangano indietro rispetto a quelle del pacchetto JavaScript, questo perchè molte volte non sono gli stessi autori dei pacchetti JavaScript
  a farne anche le dichiarazioni dei tipi ma utenti terzi. Per questo motivo potrebbero esserci dei ritardi di giorni, settimane o perfino mesi prima che arrivi una pull request da qualche benefattore che riallinea il pacchetto `@type` con l'ultima versione JavaScript.
  Se ti ritrovi in questa situazione, puoi essere tu stesso a fare la differenza ed a risolvere il problema diventando un membro a tutti gli effetti della Community.

:exclamation: Se stai aggiornando le dichiarazioni dei tipi per una libreria, ricordati di cambiare sempre la `major.minor` nella prima riga del `index.d.ts` in modo che con quella della libreria dei cui tipi stai dichiarando! :exclamation:

#### Se l'aggiornamento di una libreria comprende modifiche sostanziali (aggiornamento major), come faccio ad aggiornare il suo pacchetto '@types`?

[Le versioni semantiche](https://semver.org/) richiedono che agli aggiornamenti con modifiche sostanziali venga incrementata la parte major della versione.
Ad esempio, se ad una libreria viene rimossa una funzione che esporta e la sua ultima versione è la `3.5.8`, la sua versione deve essere aggiornata alla `4.0.0`.
Inoltre, quando questa nuova versione `4.0.0` viene pubblicata, la versione del suo pacchetto di dichiarazione dei tipi dev'essere anch'esso aggiornato alla `4.0.0`, modificandone ovviamente le dichiarazioni in modo che riflettano le modifiche sostanziali della nuova versione.

Molte librerie hanno un vasto numero di utenti che le utilizzano (compresi mantenitori di altri pacchetti che usano la libreria come dipendenza) e che probabilimente non passeranno subito alla nuova versione major. Questo perchè potrebbero volerci mesi prima che il mantenitore trovi il tempo per adattare il codice alle nuove modifiche della libreria.
Nel frattempo, utenti che usano la vecchia versione della libreria potrebbero richiedere aggiornamenti per la vecchia versione delle dichiarazioni dei tipi, ad esempio nel caso in cui un utente che usa la vecchia versione della libreria trova un errore nelle definizioni dei tipi.

Se hai intenzione di continuare a mantenere ed aggiornare le dichiarazioni dei tipi per le vecchie versioni di una libreria, puoi creare una sottocartella (es. `/v2/`) chiamata come la versione che presto diventerà vecchia e copiarci dentro tutte le dichiarazioni attuali.

Siccome la cartella principale deve sempre contenere le dichiarazioni dei tipi per la versione più nuova, avrai anche bisogno di fare alcune modifiche alle dichiarazioni della vecchia versione che ora sta nella sottocartella, per essere sicuro che gli eventuali indirizzi relativi siano riferiti alla sottocartella e non più alla cartella principale.

1. Aggiorna gli indirizzi relativi nel `tsconfig.json` ed in un eventuale `tslint.json`.
2. Aggiungi delle regole per mappare gli indirizzi cosicchè i test vengano eseguiti per la versione voluta.

Ad esempio, la libreria [`history`](https://github.com/ReactTraining/history/) ha avuto delle modifiche sostanziali passando dalla versione `2.x` alla `3.x`.
Siccome molti utenti sono rimasti alla `2.x`, un mantenitore che voleva fare ulteriori aggiornamenti alle dichiarazioni dei tipi di questa vecchia versione ha aggiunto una sottocartella `v2` nella repo delle dichiarazioni dei tipi di questa libreria.
Nel momento in cui questo README è stato scritto, il [`tsconfig.json` della history v2](https://github.com/%44efinitelyTyped/DefinitelyTyped/blob/1253faabf5e0d2c5470db6ea87795d7f96fef7e2/types/history/v2/tsconfig.json) è così:

```json
{
    "compilerOptions": {
        "baseUrl": "../../",
        "typeRoots": ["../../"],
        "paths": {
            "history": ["history/v2"]
        }
    },
    "files": [
        "index.d.ts",
        "history-tests.ts"
    ]
}
```

Se ci sono pacchetti su Definitely Typed che sono incompatibili con la vesione più nuova di una libreria, dovrai mappare gli indirizzi alla vecchia versione, continuando ricorsivamente per gli altri pacchetti che dipendono da essa.

Per esempio, `browser-sync` dipende da `micromatch@2`, quindi il [`tsconfig.json` di browser-sync](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/browser-sync/tsconfig.json) ha mappato gli indirizzi alla versione vecchia (`"micromatch": [ "micromatch/v2" ]`) fino a che non è passato alla nuova versione di `browser-sync`.
A sua volta, la libreria `browser-sync-webpack-plugin` (che dipende da `browser-sync`) ha dovuto aggiungere lo stesso mapping nel suo `tsconfig.json`, fino a che la sua dipendenza `browser-sync` non è stata aggiornata all'ultima versione.

Nota che `/// <reference types=".." />` non funziona con il mapping degli indirizzi, quindi le dipendenze devono usare `import`.

#### Come si scrivono le definizioni dei tipi per le librerie che possono essere usata sia globalmente che come modulo?

La guida di Typescript spiega benissimo [come scrivere le definizioni dei tipi](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) ed ha anche [un file di esempio](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html) che è esattamente una libreria che può essere usata sia come modulo su nodejs che come libreria globale in una pagina web.

Per accertarti che le tue definizioni possono essere usate sia globalmente che come modulo importato, crea una cartella `test` e creaci dentro due file di test.
Chiamane uno `NomeLibreria-global.test.ts` e l'altro `NomeLibreria-module.test.ts`.
Il file di test _global_ dovrebbe controllare che le definizioni funzionano bene quando la libreria è usata globalmente in una pagina web (in questo caso non devi specificare un `import`).
Il file di test _module_, invece, controlla se le definzioni funzionano quando la libreria viene importata come un modulo.
Se aggiungi la proprietà `files` nel tuo `tsconfig.json`, assicurati di includere entrambi questi file di test. Un [esempio pratico](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/big.js/test) è disponibile nelle dichiarazioni dei tipi di `big.js`.

#### E per quanto riguarda i pacchetti con scope?

I tipi per un pacchetto `@foo/bar` devono andare in `types/foo__bar`. Nota il doppio trattino basso.

Quando `dts-gen` viene usato per un pacchetto con scope, nel `tsconfig.json`, la proprietà `paths` va cambiata manualmente per referenziarlo correttamente nel package.

```json
{
    "paths": {
        "@foo/*": ["foo__*"]
    }
}
```

## Licenza

Questo progetto è sotto la licenza MIT.

I copyright nei file di definizione valgono per ogni contributore elencato all'inizio di ogni file di definizione.
