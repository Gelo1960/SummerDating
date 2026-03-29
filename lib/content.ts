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
    `Envie d'un date qui sort de l'ordinaire à {city} ? On a sélectionné {count} sorties culturelles qui vont vous faire vibrer à deux. Musées intimistes, expos immersives, spectacles vivants : il y en a pour tous les goûts. Parfait pour impressionner sans en faire trop.`,
    `À {city}, la culture se vit à deux. Voici {count} idées de sorties culturelles pensées pour un date mémorable. De la galerie confidentielle au théâtre indépendant, chaque adresse a été testée et approuvée. Préparez-vous à découvrir {city} sous un autre angle.`,
    `Un date culturel à {city}, c'est la promesse d'un moment unique et de conversations passionnantes. On vous a préparé {count} spots soigneusement sélectionnés. Que vous soyez plutôt art contemporain ou patrimoine historique, vous allez trouver votre bonheur.`,
    `{city} regorge de trésors culturels et on en a fait une sélection spéciale date. {count} lieux où l'art, l'histoire et la découverte se mêlent pour créer des souvenirs inoubliables à deux.`,
  ],
  gastronomie: [
    `Le chemin du cœur passe par l'estomac, et à {city} on sait y faire. Découvrez {count} restaurants parfaits pour un date réussi. Des adresses testées, des ambiances soignées et des assiettes qui font parler. Bon appétit !`,
    `{city} est une destination gastronomique de choix pour un date. On vous a sélectionné {count} tables qui combinent cuisine remarquable et cadre romantique. Du bistrot authentique au restaurant étoilé, il y en a pour tous les budgets.`,
    `Trouver LE bon restaurant pour un date à {city}, c'est tout un art. On vous facilite la tâche avec {count} adresses triées sur le volet. Cuisine créative, service impeccable, ambiance chaleureuse : tout est là.`,
    `Un dîner à deux à {city} ? Voici {count} restaurants qui vont transformer votre soirée en moment magique. Chaque adresse a été choisie pour son ambiance, sa cuisine et ce petit quelque chose en plus.`,
  ],
  'vie-locale': [
    `Pour un date authentique à {city}, rien de tel que de plonger dans la vie locale. On a repéré {count} bars et spots d'ambiance où vous pourrez profiter de l'atmosphère unique de la ville. Terrasses animées, bars de quartier, lieux atypiques : c'est parti !`,
    `À {city}, les meilleurs dates se vivent dans les quartiers les plus vivants. Voici {count} adresses pour s'immerger dans l'ambiance locale. L'idéal pour un date décontracté et mémorable.`,
    `Oubliez les endroits touristiques. À {city}, on a trouvé {count} bars et lieux d'ambiance fréquentés par les locaux. Parfait pour un date qui a du caractère et de la personnalité.`,
  ],
  nightlife: [
    `La nuit à {city} est pleine de promesses. On a sélectionné {count} bars à cocktails et spots nightlife pour un date qui commence quand le soleil se couche. Speakeasy cachés, rooftops avec vue, bars à ambiance : à vous de choisir.`,
    `Envie d'un date nocturne à {city} ? Voici {count} adresses pour passer une soirée inoubliable. Des cocktails signatures aux lumières tamisées, chaque spot a été choisi pour son ambiance unique.`,
    `{city} by night, c'est une autre ville qui se révèle. Découvrez {count} bars et clubs parfaits pour un date sous les étoiles. De l'apéritif au dernier verre, on vous guide.`,
  ],
  nature: [
    `À {city}, la nature offre un cadre parfait pour un date romantique. On a repéré {count} balades qui vous feront respirer à deux. Parcs secrets, bords de l'eau, jardins botaniques : laissez-vous porter.`,
    `Rien de plus romantique qu'une balade à deux. À {city}, voici {count} itinéraires nature pour un date en plein air. Idéal pour se retrouver loin du bruit et profiter de la beauté de la ville.`,
    `{city} cache des coins de nature magnifiques. On vous a sélectionné {count} balades romantiques pour un date au grand air. Sentiers ombragés, points de vue spectaculaires, coins tranquilles : c'est par ici.`,
  ],
  insolite: [
    `Un date classique, très peu pour vous ? À {city}, on a déchiché {count} sorties insolites qui vont surprendre votre moitié. Lieux secrets, expériences décalées, adresses improbables : préparez-vous à l'inattendu.`,
    `Pour un date original à {city}, misez sur l'insolite. Voici {count} idées de sorties hors des sentiers battus. De quoi marquer les esprits et créer des souvenirs uniques à deux.`,
    `{city} regorge de surprises pour les couples aventuriers. On a sélectionné {count} expériences insolites pour un date qui ne ressemble à aucun autre. Osez l'originalité !`,
  ],
  romantique: [
    `{city} est faite pour les amoureux. Découvrez {count} lieux romantiques soigneusement sélectionnés pour un date de rêve. Des adresses où le temps s'arrête et où chaque détail compte.`,
    `Envie de romantisme à {city} ? Voici {count} lieux qui vont vous faire fondre. Restaurants intimes, vues panoramiques, jardins secrets : la magie opère à chaque coin de rue.`,
    `Pour un date ultra-romantique à {city}, on a trouvé {count} spots qui cochent toutes les cases. Ambiance, charme, intimité : tout est réuni pour un moment à deux parfait.`,
  ],
  shopping: [
    `Un date shopping à {city}, pourquoi pas ? On a sélectionné {count} spots pour chiner, flâner et découvrir à deux. Marchés pittoresques, concept stores, boutiques vintage : le shopping devient une aventure.`,
    `À {city}, le shopping se vit comme un date. Voici {count} adresses pour explorer la ville en mode shopping à deux. Des lieux où le style rencontre la découverte.`,
    `{city} est un terrain de jeu pour les amateurs de shopping. Découvrez {count} spots parfaits pour un date décontracté. Flâner, essayer, dénicher des perles rares : c'est parti !`,
  ],
  'bien-etre': [
    `Prenez soin de vous à deux à {city}. Voici {count} expériences bien-être pensées pour un date relaxant. Spas, hammams, massages duo : le programme parfait pour se retrouver.`,
    `Un date bien-être à {city}, c'est la parenthèse enchantée dont vous avez besoin. Découvrez {count} adresses où détente et complicité sont au rendez-vous.`,
    `À {city}, le bien-être se partage. On a sélectionné {count} expériences relaxantes pour un date tout en douceur. Idéal pour décompresser ensemble et créer de la connexion.`,
  ],
  cafe: [
    `Le premier date classique ? Un café. Et à {city}, on a les meilleures adresses. Voici {count} cafés parfaits pour apprendre à se connaître dans une ambiance cosy. Latte art, pâtisseries maison, déco soignée : tout y est.`,
    `À {city}, la culture café est une institution. Découvrez {count} adresses idéales pour un date autour d'un bon café. Des lieux chaleureux où la conversation coule naturellement.`,
    `Rien de tel qu'un bon café pour briser la glace. À {city}, voici {count} cafés triés sur le volet pour un premier (ou deuxième) date réussi. Ambiance garantie.`,
  ],
  famille: [
    `Un date actif à {city} ? On a ce qu'il faut. Voici {count} activités ludiques et fun pour un date qui bouge. Ateliers, jeux, expériences immersives : de quoi créer des souvenirs ensemble.`,
    `À {city}, les activités à deux ne manquent pas. On a sélectionné {count} idées pour un date dynamique et original. Sortez de la routine et vivez quelque chose de nouveau.`,
    `{city} offre mille et une activités pour un date inoubliable. Découvrez {count} expériences à partager à deux. De l'atelier créatif à l'aventure urbaine, il y en a pour tous les goûts.`,
  ],
  sport: [
    `Pour les couples sportifs à {city}, voici {count} activités pour un date qui fait monter l'adrénaline. Escalade, vélo, paddle, yoga : bougez ensemble et partagez des sensations fortes.`,
    `Un date sportif à {city} ? On a sélectionné {count} activités pour les duos énergiques. De quoi se dépenser, rire et créer de la complicité en mouvement.`,
    `À {city}, le sport se pratique à deux. Découvrez {count} idées d'activités sportives pour un date dynamique. Que vous soyez débutants ou confirmés, il y a forcément un spot pour vous.`,
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
        'Comptez entre 15 et 40 euros par personne selon l\'activité. Bon a savoir : beaucoup de musees de {city} proposent des tarifs reduits en soirée ou des jours de gratuite. Un bon plan pour un date sans se ruiner !',
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
        'Pour un premier date, évitez les restaurants trop formels. Un bistrot avec une belle carte et une ambiance decontractee fonctionne a merveille a {city}. Pour un date plus avance, tentez un restaurant gastronomique avec menu degustation.',
    },
    {
      question: 'Faut-il reserver pour diner a deux a {city} ?',
      answer:
        'Oui, surtout le week-end. A {city}, les meilleures tables se remplissent vite. Reservez 2 a 3 jours a l\'avance pour un vendredi ou samedi soir. En semaine, c\'est plus souple mais une reservation reste conseillee.',
    },
    {
      question: 'Quel budget prevoir pour un diner en date a {city} ?',
      answer:
        'A {city}, comptez entre 30 et 80 euros par personne selon le standing. Les bistrots et trattorias offrent un excellent rapport qualité-prix autour de 35-45 euros. N\'oubliez pas le vin ou les cocktails qui peuvent faire grimper l\'addition.',
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
        'Ca depend du quartier ! A {city}, l\'happy hour commence souvent vers 18h. Pour un date decontracte, arrivez vers 19h pour profiter de l\'ambiance sans la foule du pic de soirée (22h-minuit).',
    },
    {
      question: 'Est-ce que les bars de {city} sont adaptées a un date ?',
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
      question: 'Quel dress code pour une soirée date a {city} ?',
      answer:
        'Ca depend du lieu. Les speakeasy et rooftops de {city} apprecient un style smart casual. Les bars de quartier sont plus decontractes. Dans le doute, une tenue soignee mais pas trop formelle fait toujours l\'affaire.',
    },
  ],
  nature: [
    {
      question: 'Quelle est la meilleure saison pour une balade romantique a {city} ?',
      answer:
        'Chaque saison a son charme a {city}. Le printemps est ideal pour les jardins en fleurs, l\'ete pour les couchers de soleil, l\'automne pour les couleurs et l\'hiver pour le charme des parcs deserts. Adaptez votre balade a la météo du jour.',
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
        'Ce sont des expériences hors du commun : visites de lieux secrets, ateliers decales, aventures urbaines, escape games, diner dans le noir... A {city}, les options ne manquent pas pour surprendre votre date.',
    },
    {
      question: 'Les sorties insolites sont-elles adaptées a un premier date ?',
      answer:
        'Oui, c\'est même souvent une excellente idée ! Les expériences partagees créent de la complicité rapidement. A {city}, optez pour une activité ludique et pas trop longue pour un premier rendez-vous.',
    },
    {
      question: 'Quel budget pour une sortie insolite a {city} ?',
      answer:
        'Les prix varient beaucoup. Certaines expériences sont gratuites (street art tours, lieux secrets), d\'autres coutent entre 20 et 60 euros par personne. A {city}, il y a des options insolites pour tous les budgets.',
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
      question: 'Le shopping, c\'est vraiment une bonne idée de date ?',
      answer:
        'Oui, si c\'est fait intelligemment ! A {city}, combinez shopping et découverte : marchés vintage, concept stores, quartiers artisanaux. Ca permet de discuter naturellement tout en decouvrant les gouts de l\'autre.',
    },
    {
      question: 'Quels quartiers pour un date shopping a {city} ?',
      answer:
        'Evitez les centres commerciaux. A {city}, les meilleurs spots shopping sont dans les quartiers avec du caractere : rues paverees, boutiques independantes, marchés locaux. C\'est la que la magie opeare.',
    },
    {
      question: 'Quel budget prevoir pour un date shopping a {city} ?',
      answer:
        'L\'idée n\'est pas forcement d\'acheter. Flaner, essayer, découvrir : c\'est gratuit ! Si vous voulez ramener un souvenir, prévoyez 20-50 euros. A {city}, les marchés aux puces offrent des trouvailles a petits prix.',
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
      question: 'Un date bien-etre pour un premier rendez-vous, bonne idée ?',
      answer:
        'Pour un premier date, optez plutot pour un hammam ou un bain plutot qu\'un massage. C\'est plus decontracte et moins intime comme entree en matiere. A {city}, il y a des options parfaites pour tous les stades de la relation.',
    },
  ],
  cafe: [
    {
      question: 'Comment choisir le bon cafe pour un date a {city} ?',
      answer:
        'Privilegiez un cafe avec des places assises confortables, pas trop bruyant. A {city}, les coffee shops independants sont souvent plus adaptés a un date que les grandes chaines. Bonus si le lieu a du charme et de bonnes patisseries.',
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
      question: 'Quelles activités choisir pour un date actif a {city} ?',
      answer:
        'Ca depend de vos gouts ! A {city}, vous pouvez opter pour des ateliers creatifs (ceramique, cuisine), des expériences ludiques (escape games, bowling) ou des aventures urbaines (geocaching, rallyes). L\'essentiel, c\'est de partager un moment fun.',
    },
    {
      question: 'Combien coute une activité en date a {city} ?',
      answer:
        'Comptez entre 20 et 60 euros par personne. A {city}, certaines activités comme les visites guidées thématiques ou les ateliers découverte offrent un excellent rapport qualité-prix. Pensez aussi aux activités gratuites en plein air.',
    },
    {
      question: 'Les activités en duo sont-elles adaptées a un premier date ?',
      answer:
        'Oui ! Les activités partagees brisent la glace naturellement. A {city}, choisissez quelque chose de ludique et pas trop long (1h-2h). L\'avantage, c\'est que vous avez toujours quelque chose a faire si la conversation marque une pause.',
    },
  ],
  sport: [
    {
      question: 'Quel sport choisir pour un date a {city} ?',
      answer:
        'Pour un premier date, optez pour une activité accessible comme le velo, la rando urbaine ou le paddle. A {city}, évitez les sports trop compétitifs pour un premier rendez-vous. L\'idée, c\'est de partager un bon moment, pas de se mesurer l\'un a l\'autre.',
    },
    {
      question: 'Faut-il etre sportif pour un date sportif a {city} ?',
      answer:
        'Pas du tout ! A {city}, de nombreuses activités sont proposees en version débutant. Yoga, escalade en salle, SUP... L\'essentiel est de choisir une activité adaptée a votre niveau et de profiter du moment ensemble.',
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
    `Conseil de pro : arrivez 15 minutes en avance pour avoir le temps de vous poser et de discuter avant le debut de la visite. Beaucoup de musees ont un cafe sympa a l'entree, parfait pour briser la glace. Et si l'expo vous plait, partagez vos coups de coeur : c'est le meilleur moyen de creer de la complicité.`,
    `Astuce : consultez les agendas culturels locaux pour reperer les vernissages et nocturnes. C'est souvent gratuit, avec un verre offert, et l'ambiance est bien plus detendue qu'en journee. Ideal pour un date qui a du style.`,
  ],
  gastronomie: [
    `Notre conseil : reservez une table un peu en retrait de la salle, si possible pres d'une fenetre ou dans un coin intime. Evitez les tables au milieu de la piece ou pres de la cuisine. Et osez le menu degustation : partager les plats, c'est partager l'experience.`,
    `Astuce : n'hesitez pas a demander conseil au serveur. Ca montre que vous etes ouvert et curieux, et ca peut mener a de belles découvertes. Et si vous ne savez pas quel vin choisir, dites votre budget et laissez-vous guider.`,
  ],
  'vie-locale': [
    `Notre conseil : commencez par un bar decontracte puis laissez-vous porter par l'ambiance du quartier. Les meilleurs dates sont ceux ou on se laisse surprendre. Discutez avec le barman, goutez les specialites locales et profitez du moment.`,
    `Astuce : les happy hours sont parfaits pour un date decontracte en debut de soirée. Ca permet de tester plusieurs adresses sans exploser le budget. Et c'est plus facile de discuter quand le bar n'est pas bonde.`,
  ],
  nightlife: [
    `Conseil de pro : commencez tot (20h-21h) dans un bar a cocktails calme, puis migrez vers un spot plus anime si le feeling est bon. Evitez de commencer dans un endroit trop bruyant ou vous ne pourrez pas discuter. Et n'abusez pas des cocktails : l'important, c'est la connexion.`,
    `Astuce : renseignez-vous sur les soirées a theme. Beaucoup de bars organisent des soirées jazz, DJ sets intimistes ou degustations. Ca ajoute une touche speciale a votre date et ca donne un sujet de conversation.`,
  ],
  nature: [
    `Notre conseil : vérifiez la météo avant de partir et prévoyez un plan B (un cafe sympa a proximité). Emportez une petite couverture pour vous asseoir et profiter du paysage. Les pique-niques improvises sont toujours une bonne idée pour un date nature.`,
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
    `Notre conseil : fixez-vous un quartier et laissez-vous porter. Ne planifiez pas trop : les meilleures trouvailles se font au hasard. Et n'hesitez pas a entrer dans les boutiques qui attirent votre oeil, même si ce n'est pas votre style habituel.`,
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
    `Notre conseil : choisissez une activité ou vous etes tous les deux débutants. Ca met tout le monde sur un pied d'egalite et les fous rires sont garantis. Et ne prenez pas l'activité trop au serieux : l'important c'est de s'amuser ensemble.`,
    `Astuce : reservez l'activité en avance et preparez un petit truc apres (un gouter, un verre). L'activité brise la glace, et le moment d'apres c'est la que la vraie conversation commence.`,
  ],
  sport: [
    `Notre conseil : choisissez un niveau adapté aux deux. Si l'un est sportif et l'autre débutant, optez pour une activité accessible et fun plutot que performante. L'idée c'est de partager, pas de se mettre la pression.`,
    `Astuce : prévoyez un plan pour apres le sport. Un brunch, un smoothie, un coin au soleil pour s'etirer. Les endorphines post-effort rendent la conversation plus facile et plus joyeuse. C'est prouve !`,
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
