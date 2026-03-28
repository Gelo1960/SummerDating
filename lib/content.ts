// ---------------------------------------------------------------------------
// Content generation for programmatic SEO pages
// ---------------------------------------------------------------------------
// All content is in French with a casual, engaging tone.
// Templates use deterministic variation based on simple hashing so that
// each city x category page gets a unique-feeling paragraph while remaining
// reproducible across builds.
// ---------------------------------------------------------------------------

/**
 * Simple deterministic hash to pick template variants.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

// ---------------------------------------------------------------------------
// Intro generation
// ---------------------------------------------------------------------------

const INTRO_TEMPLATES: Record<string, string[]> = {
  culture: [
    `Envie d'un date qui sort de l'ordinaire a {city} ? On a selectionne {count} sorties culturelles qui vont vous faire vibrer a deux. Musees intimistes, expos immersives, spectacles vivants : il y en a pour tous les gouts. Parfait pour impressionner sans en faire trop.`,
    `A {city}, la culture se vit a deux. Voici {count} idees de sorties culturelles pensees pour un date memorable. De la galerie confidentielle au theatre independant, chaque adresse a ete testee et approuvee. Preparez-vous a decouvrir {city} sous un autre angle.`,
    `Un date culturel a {city}, c'est la promesse d'un moment unique et de conversations passionnantes. On vous a prepare {count} spots soigneusement selectionnes. Que vous soyez plutot art contemporain ou patrimoine historique, vous allez trouver votre bonheur.`,
    `{city} regorge de tresors culturels et on en a fait une selection speciale date. {count} lieux ou l'art, l'histoire et la decouverte se melent pour creer des souvenirs inoubliables a deux.`,
  ],
  gastronomie: [
    `Le chemin du coeur passe par l'estomac, et a {city} on sait y faire. Decouvrez {count} restaurants parfaits pour un date reussi. Des adresses testees, des ambiances soignees et des assiettes qui font parler. Bon appetit !`,
    `{city} est une destination gastronomique de choix pour un date. On vous a selectionne {count} tables qui combinent cuisine remarquable et cadre romantique. Du bistrot authentique au restaurant etoile, il y en a pour tous les budgets.`,
    `Trouver LE bon restaurant pour un date a {city}, c'est tout un art. On vous facilite la tache avec {count} adresses triees sur le volet. Cuisine creative, service impeccable, ambiance chaleureuse : tout est la.`,
    `Un diner a deux a {city} ? Voici {count} restaurants qui vont transformer votre soiree en moment magique. Chaque adresse a ete choisie pour son ambiance, sa cuisine et ce petit quelque chose en plus.`,
  ],
  'vie-locale': [
    `Pour un date authentique a {city}, rien de tel que de plonger dans la vie locale. On a repere {count} bars et spots d'ambiance ou vous pourrez profiter de l'atmosphere unique de la ville. Terrasses animees, bars de quartier, lieux atypiques : c'est parti !`,
    `A {city}, les meilleurs dates se vivent dans les quartiers les plus vivants. Voici {count} adresses pour s'immerger dans l'ambiance locale. L'ideal pour un date decontracte et memorable.`,
    `Oubliez les endroits touristiques. A {city}, on a trouve {count} bars et lieux d'ambiance frequentes par les locaux. Parfait pour un date qui a du caractere et de la personnalite.`,
  ],
  nightlife: [
    `La nuit a {city} est pleine de promesses. On a selectionne {count} bars a cocktails et spots nightlife pour un date qui commence quand le soleil se couche. Speakeasy caches, rooftops avec vue, bars a ambiance : a vous de choisir.`,
    `Envie d'un date nocturne a {city} ? Voici {count} adresses pour passer une soiree inoubliable. Des cocktails signatures aux lumieres tamisees, chaque spot a ete choisi pour son ambiance unique.`,
    `{city} by night, c'est une autre ville qui se revele. Decouvrez {count} bars et clubs parfaits pour un date sous les etoiles. De l'aperitif au dernier verre, on vous guide.`,
  ],
  nature: [
    `A {city}, la nature offre un cadre parfait pour un date romantique. On a repere {count} balades qui vous feront respirer a deux. Parcs secrets, bords de l'eau, jardins botaniques : laissez-vous porter.`,
    `Rien de plus romantique qu'une balade a deux. A {city}, voici {count} itineraires nature pour un date en plein air. Ideal pour se retrouver loin du bruit et profiter de la beaute de la ville.`,
    `{city} cache des coins de nature magnifiques. On vous a selectionne {count} balades romantiques pour un date au grand air. Sentiers ombragees, points de vue spectaculaires, coins tranquilles : c'est par ici.`,
  ],
  insolite: [
    `Un date classique, tres peu pour vous ? A {city}, on a dechiche {count} sorties insolites qui vont surprendre votre moitie. Lieux secrets, experiences decalees, adresses improbables : preparez-vous a l'inattendu.`,
    `Pour un date original a {city}, misez sur l'insolite. Voici {count} idees de sorties hors des sentiers battus. De quoi marquer les esprits et creer des souvenirs uniques a deux.`,
    `{city} regorge de surprises pour les couples aventuriers. On a selectionne {count} experiences insolites pour un date qui ne ressemble a aucun autre. Osez l'originalite !`,
  ],
  romantique: [
    `{city} est faite pour les amoureux. Decouvrez {count} lieux romantiques soigneusement selectionnes pour un date de reve. Des adresses ou le temps s'arrete et ou chaque detail compte.`,
    `Envie de romantisme a {city} ? Voici {count} lieux qui vont vous faire fondre. Restaurants intimes, vues panoramiques, jardins secrets : la magie opere a chaque coin de rue.`,
    `Pour un date ultra-romantique a {city}, on a trouve {count} spots qui cochent toutes les cases. Ambiance, charme, intimite : tout est reuni pour un moment a deux parfait.`,
  ],
  shopping: [
    `Un date shopping a {city}, pourquoi pas ? On a selectionne {count} spots pour chiner, flaner et decouvrir a deux. Marches pittoresques, concept stores, boutiques vintage : le shopping devient une aventure.`,
    `A {city}, le shopping se vit comme un date. Voici {count} adresses pour explorer la ville en mode shopping a deux. Des lieux ou le style rencontre la decouverte.`,
    `{city} est un terrain de jeu pour les amateurs de shopping. Decouvrez {count} spots parfaits pour un date decontracte. Flaner, essayer, denicher des perles rares : c'est parti !`,
  ],
  'bien-etre': [
    `Prenez soin de vous a deux a {city}. Voici {count} experiences bien-etre pensees pour un date relaxant. Spas, hammams, massages duo : le programme parfait pour se retrouver.`,
    `Un date bien-etre a {city}, c'est la parenthese enchantee dont vous avez besoin. Decouvrez {count} adresses ou detente et complicite sont au rendez-vous.`,
    `A {city}, le bien-etre se partage. On a selectionne {count} experiences relaxantes pour un date tout en douceur. Ideal pour decompresser ensemble et creer de la connexion.`,
  ],
  cafe: [
    `Le premier date classique ? Un cafe. Et a {city}, on a les meilleures adresses. Voici {count} cafes parfaits pour apprendre a se connaitre dans une ambiance cosy. Latte art, patisseries maison, deco soignee : tout y est.`,
    `A {city}, la culture cafe est une institution. Decouvrez {count} adresses ideales pour un date autour d'un bon cafe. Des lieux chaleureux ou la conversation coule naturellement.`,
    `Rien de tel qu'un bon cafe pour briser la glace. A {city}, voici {count} cafes triees sur le volet pour un premier (ou deuxieme) date reussi. Ambiance garantie.`,
  ],
  famille: [
    `Un date actif a {city} ? On a ce qu'il faut. Voici {count} activites ludiques et fun pour un date qui bouge. Ateliers, jeux, experiences immersives : de quoi creer des souvenirs ensemble.`,
    `A {city}, les activites a deux ne manquent pas. On a selectionne {count} idees pour un date dynamique et original. Sortez de la routine et vivez quelque chose de nouveau.`,
    `{city} offre mille et une activites pour un date inoubliable. Decouvrez {count} experiences a partager a deux. De l'atelier creatif a l'aventure urbaine, il y en a pour tous les gouts.`,
  ],
  sport: [
    `Pour les couples sportifs a {city}, voici {count} activites pour un date qui fait monter l'adrenaline. Escalade, velo, paddle, yoga : bougez ensemble et partagez des sensations fortes.`,
    `Un date sportif a {city} ? On a selectionne {count} activites pour les duos energiques. De quoi se depenser, rire et creer de la complicite en mouvement.`,
    `A {city}, le sport se pratique a deux. Decouvrez {count} idees d'activites sportives pour un date dynamique. Que vous soyez debutants ou confirmes, il y a forcement un spot pour vous.`,
  ],
};

/**
 * Generate a unique intro paragraph for a city x category page.
 */
export function generateIntro(
  category: string,
  city: string,
  count: number,
): string {
  const templates = INTRO_TEMPLATES[category] ?? INTRO_TEMPLATES['culture'];
  const seed = simpleHash(`${category}-${city}`);
  const template = pick(templates, seed);

  return template
    .replace(/\{city\}/g, city)
    .replace(/\{count\}/g, String(count));
}

// ---------------------------------------------------------------------------
// FAQ generation
// ---------------------------------------------------------------------------

interface FAQ {
  question: string;
  answer: string;
}

const FAQ_TEMPLATES: Record<string, FAQ[]> = {
  culture: [
    {
      question: 'Quel est le meilleur moment pour une sortie culturelle a {city} ?',
      answer:
        'En general, le mardi et le mercredi sont les jours les plus calmes dans les musees et galeries de {city}. Privilegiez aussi les creneaux en debut d\'apres-midi pour eviter la foule et profiter pleinement de votre date.',
    },
    {
      question: 'Faut-il reserver a l\'avance pour les sorties culturelles a {city} ?',
      answer:
        'Pour les expositions temporaires et les spectacles populaires, on vous recommande de reserver. Pour les musees permanents et les galeries, vous pouvez souvent y aller spontanement. Verifiez les horaires sur les sites officiels.',
    },
    {
      question: 'Quel budget prevoir pour un date culturel a {city} ?',
      answer:
        'Comptez entre 15 et 40 euros par personne selon l\'activite. Bon a savoir : beaucoup de musees de {city} proposent des tarifs reduits en soiree ou des jours de gratuite. Un bon plan pour un date sans se ruiner !',
    },
    {
      question: 'Comment choisir une sortie culturelle pour un premier date a {city} ?',
      answer:
        'Optez pour une expo interactive ou un spectacle court (1h-1h30). Ca laisse le temps de discuter avant et apres, sans la pression d\'un tete-a-tete de 3 heures. A {city}, les galeries d\'art contemporain sont ideales pour ca.',
    },
  ],
  gastronomie: [
    {
      question: 'Quel type de restaurant choisir pour un date a {city} ?',
      answer:
        'Pour un premier date, evitez les restaurants trop formels. Un bistrot avec une belle carte et une ambiance decontractee fonctionne a merveille a {city}. Pour un date plus avance, tentez un restaurant gastronomique avec menu degustation.',
    },
    {
      question: 'Faut-il reserver pour diner a deux a {city} ?',
      answer:
        'Oui, surtout le week-end. A {city}, les meilleures tables se remplissent vite. Reservez 2 a 3 jours a l\'avance pour un vendredi ou samedi soir. En semaine, c\'est plus souple mais une reservation reste conseillee.',
    },
    {
      question: 'Quel budget prevoir pour un diner en date a {city} ?',
      answer:
        'A {city}, comptez entre 30 et 80 euros par personne selon le standing. Les bistrots et trattorias offrent un excellent rapport qualite-prix autour de 35-45 euros. N\'oubliez pas le vin ou les cocktails qui peuvent faire grimper l\'addition.',
    },
  ],
  'vie-locale': [
    {
      question: 'Comment trouver les meilleurs bars locaux a {city} ?',
      answer:
        'Eloignez-vous des grandes arteres touristiques. A {city}, les meilleurs spots se cachent souvent dans les rues secondaires des quartiers residentiels. N\'hesitez pas a demander aux locaux ou a explorer les recommandations de notre selection.',
    },
    {
      question: 'Quelle est la meilleure heure pour sortir a {city} ?',
      answer:
        'Ca depend du quartier ! A {city}, l\'happy hour commence souvent vers 18h. Pour un date decontracte, arrivez vers 19h pour profiter de l\'ambiance sans la foule du pic de soiree (22h-minuit).',
    },
    {
      question: 'Est-ce que les bars de {city} sont adaptees a un date ?',
      answer:
        'Absolument. {city} a une culture bar tres riche. Privilegiez les bars avec des coins intimistes, des banquettes ou des terrasses calmes. Notre selection met en avant les adresses avec la meilleure ambiance pour un date.',
    },
  ],
  nightlife: [
    {
      question: 'Quels sont les meilleurs quartiers pour sortir le soir a {city} ?',
      answer:
        '{city} a plusieurs quartiers festifs. Pour un date, privilegiez les bars a cocktails et speakeasy plutot que les grandes boites de nuit. L\'ambiance est plus intime et la conversation plus facile.',
    },
    {
      question: 'A quelle heure sortir pour un date nightlife a {city} ?',
      answer:
        'Pour un cocktail date, 20h-21h est ideal. Ca vous laisse le temps de profiter de l\'ambiance sans que la musique soit trop forte. A {city}, beaucoup de bars a cocktails ont leur plus belle ambiance entre 21h et 23h.',
    },
    {
      question: 'Quel dress code pour une soiree date a {city} ?',
      answer:
        'Ca depend du lieu. Les speakeasy et rooftops de {city} apprecient un style smart casual. Les bars de quartier sont plus decontractes. Dans le doute, une tenue soignee mais pas trop formelle fait toujours l\'affaire.',
    },
  ],
  nature: [
    {
      question: 'Quelle est la meilleure saison pour une balade romantique a {city} ?',
      answer:
        'Chaque saison a son charme a {city}. Le printemps est ideal pour les jardins en fleurs, l\'ete pour les couchers de soleil, l\'automne pour les couleurs et l\'hiver pour le charme des parcs deserts. Adaptez votre balade a la meteo du jour.',
    },
    {
      question: 'Combien de temps prevoir pour une balade en date a {city} ?',
      answer:
        'Prevoyez 1h30 a 2h pour une balade agreable. Ca laisse le temps de flaner, de s\'arreter prendre un cafe en route et de profiter des points de vue. A {city}, nos itineraires sont penses pour durer pile la bonne duree.',
    },
    {
      question: 'Faut-il un equipement special pour les balades a {city} ?',
      answer:
        'Des chaussures confortables suffisent pour la plupart des balades. Ajoutez une bouteille d\'eau et eventuellement un pique-nique pour rendre le moment encore plus special. A {city}, vous trouverez facilement de quoi grignoter en chemin.',
    },
  ],
  insolite: [
    {
      question: 'C\'est quoi une sortie insolite exactement ?',
      answer:
        'Ce sont des experiences hors du commun : visites de lieux secrets, ateliers decales, aventures urbaines, escape games, diner dans le noir... A {city}, les options ne manquent pas pour surprendre votre date.',
    },
    {
      question: 'Les sorties insolites sont-elles adaptees a un premier date ?',
      answer:
        'Oui, c\'est meme souvent une excellente idee ! Les experiences partagees creent de la complicite rapidement. A {city}, optez pour une activite ludique et pas trop longue pour un premier rendez-vous.',
    },
    {
      question: 'Quel budget pour une sortie insolite a {city} ?',
      answer:
        'Les prix varient beaucoup. Certaines experiences sont gratuites (street art tours, lieux secrets), d\'autres coutent entre 20 et 60 euros par personne. A {city}, il y a des options insolites pour tous les budgets.',
    },
  ],
  romantique: [
    {
      question: 'Quels sont les lieux les plus romantiques de {city} ?',
      answer:
        'Notre selection couvre les spots les plus romantiques de {city} : restaurants intimes, jardins secrets, rooftops avec vue, promenades au bord de l\'eau. Chaque lieu a ete choisi pour son ambiance et son charme unique.',
    },
    {
      question: 'Comment rendre un date plus romantique a {city} ?',
      answer:
        'Le secret, c\'est le cadre et l\'attention aux details. Choisissez un lieu avec une belle lumiere, une vue ou une ambiance musicale. A {city}, reservez a l\'avance et mentionnez que c\'est une occasion speciale.',
    },
    {
      question: 'Un date romantique a {city} sans se ruiner, c\'est possible ?',
      answer:
        'Absolument ! Les plus beaux moments ne coutent pas forcement cher. A {city}, une balade au coucher du soleil suivie d\'un verre en terrasse peut etre plus romantique qu\'un diner gastronomique. Notre selection inclut des options pour tous les budgets.',
    },
  ],
  shopping: [
    {
      question: 'Le shopping, c\'est vraiment une bonne idee de date ?',
      answer:
        'Oui, si c\'est fait intelligemment ! A {city}, combinez shopping et decouverte : marches vintage, concept stores, quartiers artisanaux. Ca permet de discuter naturellement tout en decouvrant les gouts de l\'autre.',
    },
    {
      question: 'Quels quartiers pour un date shopping a {city} ?',
      answer:
        'Evitez les centres commerciaux. A {city}, les meilleurs spots shopping sont dans les quartiers avec du caractere : rues paverees, boutiques independantes, marches locaux. C\'est la que la magie opeare.',
    },
    {
      question: 'Quel budget prevoir pour un date shopping a {city} ?',
      answer:
        'L\'idee n\'est pas forcement d\'acheter. Flaner, essayer, decouvrir : c\'est gratuit ! Si vous voulez ramener un souvenir, prevoyez 20-50 euros. A {city}, les marches aux puces offrent des trouvailles a petits prix.',
    },
  ],
  'bien-etre': [
    {
      question: 'Faut-il reserver un spa a l\'avance a {city} ?',
      answer:
        'Oui, surtout pour les massages duo et les forfaits couple. A {city}, les meilleurs spas affichent complet le week-end. Reservez au moins une semaine a l\'avance pour etre sur d\'avoir un creneau.',
    },
    {
      question: 'Quel budget pour un date bien-etre a {city} ?',
      answer:
        'Comptez entre 50 et 150 euros par personne selon la prestation. A {city}, les hammams et saunas sont souvent plus abordables (30-50 euros) que les massages duo. Guettez aussi les offres speciales couple.',
    },
    {
      question: 'Un date bien-etre pour un premier rendez-vous, bonne idee ?',
      answer:
        'Pour un premier date, optez plutot pour un hammam ou un bain plutot qu\'un massage. C\'est plus decontracte et moins intime comme entree en matiere. A {city}, il y a des options parfaites pour tous les stades de la relation.',
    },
  ],
  cafe: [
    {
      question: 'Comment choisir le bon cafe pour un date a {city} ?',
      answer:
        'Privilegiez un cafe avec des places assises confortables, pas trop bruyant. A {city}, les coffee shops independants sont souvent plus adaptes a un date que les grandes chaines. Bonus si le lieu a du charme et de bonnes patisseries.',
    },
    {
      question: 'Combien de temps rester dans un cafe pour un date ?',
      answer:
        '1h a 1h30, c\'est ideal pour un premier date. Ca laisse le temps de discuter sans que ca traine. Si ca se passe bien, vous pouvez toujours prolonger en vous baladant dans le quartier. A {city}, nos cafes sont tous dans des coins sympas.',
    },
    {
      question: 'Quel est le meilleur moment pour un date cafe a {city} ?',
      answer:
        'Le milieu d\'apres-midi (14h-16h) est parfait : c\'est decontracte, il fait jour et ca laisse la porte ouverte pour enchainer sur un verre si le date se passe bien. A {city}, les cafes sont au top a cette heure-la.',
    },
  ],
  famille: [
    {
      question: 'Quelles activites choisir pour un date actif a {city} ?',
      answer:
        'Ca depend de vos gouts ! A {city}, vous pouvez opter pour des ateliers creatifs (ceramique, cuisine), des experiences ludiques (escape games, bowling) ou des aventures urbaines (geocaching, rallyes). L\'essentiel, c\'est de partager un moment fun.',
    },
    {
      question: 'Combien coute une activite en date a {city} ?',
      answer:
        'Comptez entre 20 et 60 euros par personne. A {city}, certaines activites comme les visites guidees thematiques ou les ateliers decouverte offrent un excellent rapport qualite-prix. Pensez aussi aux activites gratuites en plein air.',
    },
    {
      question: 'Les activites en duo sont-elles adaptees a un premier date ?',
      answer:
        'Oui ! Les activites partagees brisent la glace naturellement. A {city}, choisissez quelque chose de ludique et pas trop long (1h-2h). L\'avantage, c\'est que vous avez toujours quelque chose a faire si la conversation marque une pause.',
    },
  ],
  sport: [
    {
      question: 'Quel sport choisir pour un date a {city} ?',
      answer:
        'Pour un premier date, optez pour une activite accessible comme le velo, la rando urbaine ou le paddle. A {city}, evitez les sports trop competitifs pour un premier rendez-vous. L\'idee, c\'est de partager un bon moment, pas de se mesurer l\'un a l\'autre.',
    },
    {
      question: 'Faut-il etre sportif pour un date sportif a {city} ?',
      answer:
        'Pas du tout ! A {city}, de nombreuses activites sont proposees en version debutant. Yoga, escalade en salle, SUP... L\'essentiel est de choisir une activite adaptee a votre niveau et de profiter du moment ensemble.',
    },
    {
      question: 'Quel equipement apporter pour un date sportif a {city} ?',
      answer:
        'La plupart des lieux de {city} fournissent l\'equipement necessaire. Prevoyez juste une tenue confortable et des baskets. N\'oubliez pas une bouteille d\'eau et eventuellement un change pour etre frais apres l\'effort.',
    },
  ],
};

/**
 * Generate 3 contextual FAQ items for a city x category page.
 */
export function generateFAQ(
  category: string,
  city: string,
): { question: string; answer: string }[] {
  const pool = FAQ_TEMPLATES[category] ?? FAQ_TEMPLATES['culture'];
  const seed = simpleHash(`faq-${category}-${city}`);

  // Pick 3 unique FAQs from the pool
  const indices = new Set<number>();
  let s = seed;
  while (indices.size < Math.min(3, pool.length)) {
    indices.add(s % pool.length);
    s = (s * 7 + 13) | 0;
    s = Math.abs(s);
  }

  return Array.from(indices).map((i) => ({
    question: pool[i].question.replace(/\{city\}/g, city),
    answer: pool[i].answer.replace(/\{city\}/g, city),
  }));
}

// ---------------------------------------------------------------------------
// Tips generation
// ---------------------------------------------------------------------------

const TIPS_TEMPLATES: Record<string, string[]> = {
  culture: [
    `Conseil de pro : arrivez 15 minutes en avance pour avoir le temps de vous poser et de discuter avant le debut de la visite. Beaucoup de musees ont un cafe sympa a l'entree, parfait pour briser la glace. Et si l'expo vous plait, partagez vos coups de coeur : c'est le meilleur moyen de creer de la complicite.`,
    `Astuce : consultez les agendas culturels locaux pour reperer les vernissages et nocturnes. C'est souvent gratuit, avec un verre offert, et l'ambiance est bien plus detendue qu'en journee. Ideal pour un date qui a du style.`,
  ],
  gastronomie: [
    `Notre conseil : reservez une table un peu en retrait de la salle, si possible pres d'une fenetre ou dans un coin intime. Evitez les tables au milieu de la piece ou pres de la cuisine. Et osez le menu degustation : partager les plats, c'est partager l'experience.`,
    `Astuce : n'hesitez pas a demander conseil au serveur. Ca montre que vous etes ouvert et curieux, et ca peut mener a de belles decouvertes. Et si vous ne savez pas quel vin choisir, dites votre budget et laissez-vous guider.`,
  ],
  'vie-locale': [
    `Notre conseil : commencez par un bar decontracte puis laissez-vous porter par l'ambiance du quartier. Les meilleurs dates sont ceux ou on se laisse surprendre. Discutez avec le barman, goutez les specialites locales et profitez du moment.`,
    `Astuce : les happy hours sont parfaits pour un date decontracte en debut de soiree. Ca permet de tester plusieurs adresses sans exploser le budget. Et c'est plus facile de discuter quand le bar n'est pas bonde.`,
  ],
  nightlife: [
    `Conseil de pro : commencez tot (20h-21h) dans un bar a cocktails calme, puis migrez vers un spot plus anime si le feeling est bon. Evitez de commencer dans un endroit trop bruyant ou vous ne pourrez pas discuter. Et n'abusez pas des cocktails : l'important, c'est la connexion.`,
    `Astuce : renseignez-vous sur les soirees a theme. Beaucoup de bars organisent des soirees jazz, DJ sets intimistes ou degustations. Ca ajoute une touche speciale a votre date et ca donne un sujet de conversation.`,
  ],
  nature: [
    `Notre conseil : verifiez la meteo avant de partir et prevoyez un plan B (un cafe sympa a proximite). Emportez une petite couverture pour vous asseoir et profiter du paysage. Les pique-niques improvises sont toujours une bonne idee pour un date nature.`,
    `Astuce : choisissez un itineraire avec un point d'arrivee agreable (un cafe, un point de vue, un village). Ca donne un objectif a la balade et un endroit ou se poser pour discuter. Et prenez votre temps : c'est pas une course !`,
  ],
  insolite: [
    `Notre conseil : ne revelez pas tout a l'avance. Le mystere fait partie du charme d'une sortie insolite. Dites juste a votre date de se preparer a une surprise. Et gardez votre telephone en mode silencieux pour vivre l'experience a fond.`,
    `Astuce : combinez l'insolite avec un moment plus classique (un verre apres l'experience). Ca permet de debriefer, de partager vos impressions et de prolonger le date naturellement.`,
  ],
  romantique: [
    `Notre conseil : les details font la difference. Reservez a l'avance, arrivez a l'heure, et choisissez un lieu qui correspond aux gouts de l'autre plutot qu'aux votres. Le romantisme, c'est avant tout de l'attention et de la prevenance.`,
    `Astuce : les couchers de soleil sont gratuits et toujours magiques. Reparez un spot avec une belle vue et planifiez votre date pour y etre au bon moment. C'est simple mais terriblement efficace.`,
  ],
  shopping: [
    `Notre conseil : fixez-vous un quartier et laissez-vous porter. Ne planifiez pas trop : les meilleures trouvailles se font au hasard. Et n'hesitez pas a entrer dans les boutiques qui attirent votre oeil, meme si ce n'est pas votre style habituel.`,
    `Astuce : terminez le shopping par un cafe ou un verre. Ca permet de deballer vos trouvailles, de comparer vos gouts et de prolonger le moment. Le shopping, c'est le preambule, le vrai date c'est apres !`,
  ],
  'bien-etre': [
    `Notre conseil : arrivez 20 minutes avant votre soin pour profiter des installations (sauna, hammam, espace detente). Ca vous met dans le bon etat d'esprit. Et apres le soin, prenez le temps de boire un the ensemble au calme.`,
    `Astuce : offrez l'experience comme une surprise. Reservez tout en avance et ne revelez la destination qu'au dernier moment. L'effet de surprise rend le moment encore plus special.`,
  ],
  cafe: [
    `Notre conseil : choisissez un cafe ou vous etes deja alle. Ca vous donne de l'assurance et vous pouvez recommander les specialites de la maison. Arrivez quelques minutes avant pour reserver la meilleure table et commander un premier cafe.`,
    `Astuce : si le date se passe bien, proposez de continuer dans le quartier. Une balade impromptue ou un detour par une galerie voisine peut transformer un simple cafe en apres-midi memorable.`,
  ],
  famille: [
    `Notre conseil : choisissez une activite ou vous etes tous les deux debutants. Ca met tout le monde sur un pied d'egalite et les fous rires sont garantis. Et ne prenez pas l'activite trop au serieux : l'important c'est de s'amuser ensemble.`,
    `Astuce : reservez l'activite en avance et preparez un petit truc apres (un gouter, un verre). L'activite brise la glace, et le moment d'apres c'est la que la vraie conversation commence.`,
  ],
  sport: [
    `Notre conseil : choisissez un niveau adapte aux deux. Si l'un est sportif et l'autre debutant, optez pour une activite accessible et fun plutot que performante. L'idee c'est de partager, pas de se mettre la pression.`,
    `Astuce : prevoyez un plan pour apres le sport. Un brunch, un smoothie, un coin au soleil pour s'etirer. Les endorphines post-effort rendent la conversation plus facile et plus joyeuse. C'est prouve !`,
  ],
};

/**
 * Generate a tips paragraph for a given category.
 */
export function generateTips(category: string): string {
  const templates = TIPS_TEMPLATES[category] ?? TIPS_TEMPLATES['culture'];
  // Deterministic pick based on category
  const seed = simpleHash(`tips-${category}`);
  return pick(templates, seed);
}
