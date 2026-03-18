export type Category = 'Mixare' | 'Cooperare' | 'Miscare' | 'Minte' | 'Calm';
export type ClassLevel = 'P' | '1' | '2' | '3' | '4';
export type BreakType = 'Mica' | 'Mare';

export interface Game {
  id: string;
  title: string;
  description: string;
  rule: string;
  duration: number; // seconds
  category: Category;
  minLevel: ClassLevel;
  mascotQuote: string;
}

export const levelValue = (level: ClassLevel) => {
  switch (level) {
    case 'P': return 0;
    case '1': return 1;
    case '2': return 2;
    case '3': return 3;
    case '4': return 4;
  }
};

export const games: Game[] = [
  // Mixare (Priority 3x in selection)
  {
    id: 'mix-1',
    title: 'Salut-Flash',
    description: 'Plimbați-vă prin clasă. La semnal, salutați cel mai apropiat coleg într-un mod nou (high-five, salut cu cotul, reverență).',
    rule: 'Dacă cineva e singur, un grup de doi îl invită imediat să facă un salut în trei!',
    duration: 30,
    category: 'Mixare',
    minLevel: 'P',
    mascotQuote: 'Salutul tău poate face ziua cuiva mai bună!'
  },
  {
    id: 'mix-2',
    title: 'Rânduri Amestecate',
    description: 'Așezați-vă în rând după luna nașterii, fără să vorbiți! Folosiți doar semne.',
    rule: 'Ajutați-vă colegii să-și găsească locul. Nimeni nu rămâne pe dinafară.',
    duration: 60,
    category: 'Mixare',
    minLevel: '2',
    mascotQuote: 'Comunicarea e mai mult decât cuvinte!'
  },
  {
    id: 'mix-3',
    title: 'Mini-Quiz în Doi',
    description: 'Găsește un coleg cu care nu ai stat azi și află care este culoarea lui preferată.',
    rule: 'Fiecare trebuie să aibă un partener. Grupurile de 3 sunt perfect acceptate!',
    duration: 35,
    category: 'Mixare',
    minLevel: 'P',
    mascotQuote: 'Descoperă ceva nou despre un coleg!'
  },
  {
    id: 'mix-4',
    title: 'Grupuri de Culori',
    description: 'Formați grupuri rapide în funcție de o culoare pe care o aveți pe haine.',
    rule: 'Dacă cineva are o culoare unică, toată clasa îl aplaudă și se alătură grupului cel mai apropiat.',
    duration: 30,
    category: 'Mixare',
    minLevel: '1',
    mascotQuote: 'Culorile ne aduc împreună!'
  },

  // Cooperare
  {
    id: 'coop-1',
    title: 'Micro-Echipă de 3',
    description: 'Formați echipe de câte 3 și încercați să construiți cea mai înaltă literă "A" din degetele voastre.',
    rule: 'Toți cei 3 membri trebuie să contribuie cu cel puțin un deget.',
    duration: 45,
    category: 'Cooperare',
    minLevel: '1',
    mascotQuote: 'Împreună construim lucruri mărețe!'
  },
  {
    id: 'coop-2',
    title: 'Schimb de Complimente',
    description: 'Întoarce-te către colegul din spate și spune-i un lucru pe care îl apreciezi la el.',
    rule: 'Dacă nu ai pe nimeni în spate, întoarce-te spre stânga sau dreapta. Toată lumea primește un compliment.',
    duration: 30,
    category: 'Cooperare',
    minLevel: 'P',
    mascotQuote: 'Cuvintele bune sunt magice!'
  },
  {
    id: 'coop-3',
    title: 'Gluma Bună',
    description: 'Găsește un partener și spuneți-vă cea mai bună glumă (fără să jigniți pe nimeni).',
    rule: 'Râdem ÎMPREUNĂ, nu unii de alții.',
    duration: 40,
    category: 'Cooperare',
    minLevel: '2',
    mascotQuote: 'Un zâmbet e contagios!'
  },
  {
    id: 'coop-4',
    title: 'Podul Uman',
    description: 'În grupuri de 4, prindeți-vă de mâini pentru a forma un "pod" pe sub care poate trece o minge imaginară.',
    rule: 'Așteptați-vă unii pe alții. Podul trebuie să fie stabil.',
    duration: 45,
    category: 'Cooperare',
    minLevel: '1',
    mascotQuote: 'Suntem mai puternici când ne ținem de mâini!'
  },

  // Miscare
  {
    id: 'misc-1',
    title: 'Clap Sync',
    description: 'Toată clasa trebuie să bată din palme exact în același timp, o singură dată, la numărătoarea profesorului.',
    rule: 'Dacă nu ne iese din prima, încercăm din nou, fără să dăm vina pe nimeni.',
    duration: 20,
    category: 'Miscare',
    minLevel: 'P',
    mascotQuote: 'Sincronizare perfectă!'
  },
  {
    id: 'misc-2',
    title: 'Pinguin-Dans',
    description: 'Ridicați-vă și mergeți ca pinguinii pe loc timp de 15 secunde.',
    rule: 'Toată lumea participă în ritmul ei. Zâmbetele sunt obligatorii.',
    duration: 25,
    category: 'Miscare',
    minLevel: 'P',
    mascotQuote: 'Waddle, waddle!'
  },
  {
    id: 'misc-3',
    title: 'Animale în 2 secunde',
    description: 'La semnal, luați poziția animalului vostru preferat și "înghețați" timp de 5 secunde.',
    rule: 'Fiecare animal este acceptat în jungla clasei noastre.',
    duration: 30,
    category: 'Miscare',
    minLevel: 'P',
    mascotQuote: 'Roar! Miau! Ham!'
  },
  {
    id: 'misc-4',
    title: 'Oglinda',
    description: 'În perechi, unul face o mișcare lentă, celălalt o copiază exact ca o oglindă.',
    rule: 'Mișcările trebuie să fie lente ca partenerul să poată ține pasul.',
    duration: 45,
    category: 'Miscare',
    minLevel: '1',
    mascotQuote: 'Fii reflexia bunătății!'
  },

  // Minte
  {
    id: 'mint-1',
    title: 'Superputerea Mea Azi',
    description: 'Gândește-te care este "superputerea" ta de azi (ex: răbdare, curaj, atenție) și spune-o în șoaptă colegului de bancă.',
    rule: 'Ascultăm cu respect superputerea celuilalt, fără să judecăm.',
    duration: 35,
    category: 'Minte',
    minLevel: '2',
    mascotQuote: 'Toți avem superputeri ascunse!'
  },
  {
    id: 'mint-2',
    title: 'Cuvinte care Vindecă',
    description: 'Gândiți-vă la un cuvânt care vă face să vă simțiți bine când sunteți triști. Scrieți-l imaginar în aer.',
    rule: 'Fiecare sentiment este valid.',
    duration: 30,
    category: 'Minte',
    minLevel: '3',
    mascotQuote: 'Cuvintele au putere!'
  },
  {
    id: 'mint-3',
    title: 'Alege 1 Cuvânt Bun',
    description: 'Alege un cuvânt pozitiv care să descrie clasa voastră și spune-l cu voce tare la semnal (toți deodată).',
    rule: 'Orice cuvânt pozitiv este un răspuns corect.',
    duration: 20,
    category: 'Minte',
    minLevel: '1',
    mascotQuote: 'Clasa noastră este minunată!'
  },

  // Calm
  {
    id: 'calm-1',
    title: 'Respirație de Echipă',
    description: 'Inspirăm toți împreună timp de 3 secunde, expirăm 3 secunde. Repetăm de 3 ori.',
    rule: 'Păstrăm liniștea pentru a ne auzi respirația ca un singur grup.',
    duration: 30,
    category: 'Calm',
    minLevel: 'P',
    mascotQuote: 'Inspiră calm, expiră griji.'
  },
  {
    id: 'calm-2',
    title: 'Zâmbet Reset',
    description: 'Închideți ochii pentru 10 secunde. Când îi deschideți, oferiți un zâmbet larg primului coleg pe care îl vedeți.',
    rule: 'Zâmbim tuturor, indiferent cu cine ne intersectăm privirea.',
    duration: 25,
    category: 'Calm',
    minLevel: 'P',
    mascotQuote: 'Un zâmbet resetează ziua!'
  },
  {
    id: 'calm-3',
    title: 'Răbdare 10 sec',
    description: 'Stăm complet nemișcați și în liniște deplină timp de 10 secunde.',
    rule: 'Dacă cineva se mișcă, nu râdem, doar continuăm să fim calmi.',
    duration: 20,
    category: 'Calm',
    minLevel: '1',
    mascotQuote: 'Liniștea ne dă putere.'
  }
];
