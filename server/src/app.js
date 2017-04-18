// npm packages
import express from 'express';
import morgan from 'morgan';

// our packages
import { logger } from './util';
import pool from './db/pg';


// init app
const app = express();

app.disable('x-powered-by');

// set up logging
app.use(morgan('combined', { stream: logger.stream }));

// app.VERB in Express documentation
// get and post are most common verbs
// method takes a path and a function
app.set('port', process.env.PORT || 3000);

// in Express, the order in which routes and middleware are added is important!

app.get('/api/tweet', (req, res) => {
  // get all tweets
  pool.query('SELECT * FROM TWEET;', (err, result) => {
    res.json(result.rows);
  });
});

app.get('/api/tweet/:user', (req, res) => {
  // get all tweets by user
  const user = req.params.user;

  pool.query(`SELECT * FROM TWEET WHERE UName = '${user}';`, (err, result) => {
    res.json(result.rows);
  });
});

app.get('/create', (req, res) => {
  // create the database tables
  pool.query('CREATE TABLE ACCOUNT (Username varchar(16) PRIMARY KEY, FullName varchar(50) NOT NULL, Email varchar(50), JoinDate timestamp DEFAULT CURRENT_DATE, Bio varchar(300));\
  CREATE TABLE TWEET (UName varchar(16) NOT NULL, Content varchar(140) NOT NULL, TimeStamp timestamp NOT NULL DEFAULT CURRENT_DATE, TweetNum SERIAL PRIMARY KEY);\
  ALTER TABLE TWEET ADD CONSTRAINT FK1 FOREIGN KEY (UName) REFERENCES ACCOUNT (Username);\
  CREATE TABLE HASHTAG (Tag varchar(50) PRIMARY KEY);\
  CREATE TABLE USAGE (TweetNum int NOT NULL, Hash varchar(50) NOT NULL);\
  ALTER TABLE USAGE ADD CONSTRAINT FK2 FOREIGN KEY (TweetNum) REFERENCES TWEET (TweetNum);\
  ALTER TABLE USAGE ADD CONSTRAINT FK3 FOREIGN KEY (Hash) REFERENCES HASHTAG;\
  ALTER TABLE USAGE ADD PRIMARY KEY (TweetNum, Hash);', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  res.send('Created the database tables');
});

app.get('/insert', (req, res) => {
  // insert accounts and tweets into the database
  // BBCWorld tweets
  pool.query('INSERT INTO ACCOUNT (Username, FullName, Email, Bio) VALUES (\'BBCWorld\', \'BBC News (World)\', \'news@bbc.com\', \'News, features and analysis from the World\'\'s newsroom. Breaking news, follow @BBCBreaking. UK news, @BBCNews. Latest sports news @BBCSport\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (1, \'BBCWorld\', \'US military drops \'\'mother of all bombs on IS\'\' in Afghanistan\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (2, \'BBCWorld\', \'How Rosa Parks\'\' house moved 4,000 miles\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (3, \'BBCWorld\', \'Migrant crisis: \'\'Nearly 100 missing after Libya boat sinks\'\'\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (4, \'BBCWorld\', \'Trump\'\'s Mar-a-Lago kitchen cited for food safety violations\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (5, \'BBCWorld\', \'Trump reverses course in 24 hours from Nato to China to Fed\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  // DailyCollegian tweets
  pool.query('INSERT INTO ACCOUNT (Username, FullName, Email, Bio) VALUES (\'DailyCollegian\', \'The Daily Collegian\', \'editor@collegian.psu.edu\', \'Independent student newspaper bringing you the latest from the Penn State community since 1887. Got news? Tweet at us.\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (6, \'DailyCollegian\', \'Jake Pilewicz picked up win in first collegiate start as @PennStateBASE took down Bucknell Wednesday\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (7, \'DailyCollegian\', \'Penn State Assistant Dean for Multicultural Affairs in the @PSUCollegeComm Joseph Selden retiring after 23 years\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (8, \'DailyCollegian\' , \'Penn State employees curated digital data collections including government climate science data at risk of removal\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (9, \'DailyCollegian\' , \'JUST IN: Reilly Ebbs is confirmed unanimously as the next @UPUA chief justice\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (10, \'DailyCollegian\' ,  \'With a budget of $140,000, @UPUA will vote on how to allocate the money at tonight\'\'s meeting\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  // FCBayern tweets
  pool.query('INSERT INTO ACCOUNT (Username, FullName, Email, Bio) VALUES (\'FCBayern\', \'FC Bayern München\', \'fanshop@fcb.de\', \'Offizielle Seite des #FCBayern Intl: @FCBayernEN | @FCBayernES | @FCBayernUS | @FCBayernAR Fans: @FCBayern_FB | Nachwuchs: @FCBjuniorteam | Frauen: @FCBfrauen\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (11, \'FCBayern\' , \'Zurück in München! Gute Nacht! #B04FCB\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (12, \'FCBayern\' , \'Wir haben mit großer Intensität gespielt, hatten viele Möglichkeiten. Aber manchmal passiert so ein Unentschieden.\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (13, \'FCBayern\' , \'.@David_Alaba weiter: \'\'Wir haben noch ein paar Tage bis #RMAFCB, wir glauben an uns und sind motiviert.\'\' #B04FCB\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (14, \'FCBayern\' , \'\'\'Wir haben an sich ein gutes Spiel gemacht, aber die Chancen-Auswertung war fatal. Deswegen sind wir unzufrieden.\'\' @esmuellert_ #MiaSanMia\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (15, \'FCBayern\' , \'Wie immer DANKE an alle #FCBayern-Fans für die überragende Unterstützung! Wir freuen uns auf Dienstag mit EUCH! #MiaSanMia\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  // AP tweets
  pool.query('INSERT INTO ACCOUNT (Username, FullName, Bio) VALUES (\'AP\', \'The Associated Press\', \'news from The Associated Press, and a taste of the great journalism produced by AP members and customers.\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (16, \'AP\', \'Some British legislators want to revoke UK citizenship of Syrian president\'\'s wife, Asma Assad\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (17, \'AP\', \'Christians in Middle East celebrate Easter in midst of war, religious violence, discrimination\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (18, \'AP\', \'Ex-governor of Mexico\'\'s Veracruz, detained in Guatemala on money laundering, organized crime charges\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (19, \'AP\', \'The Latest: US says North Korea fired a medium-range missile and it exploded 4-5 seconds after launch\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  pool.query('INSERT INTO TWEET (TweetNum, UName, Content) VALUES (20, \'AP\', \'U.S Military seeks civilians with high-tech skills in fight against Islamic State group\');', (err, result) => {
    if (err) {
      logger.error(err);
    }
  });

  res.send('Inserted accounts and tweets into the database');
});

app.get('/headers', (req, res) => {
  res.set('Content-Type', 'text/plain');
  let s = '';
  for (const name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

// app.use is how Express adds middleware
// think of app.use as a catch-all handler for anything that didn't get matched by a route
// Express can distinguish between the 404 and 500 handlers by the number of arguments their callback functions take (covered in ch10 and ch12)
app.use((err, req, res, next) => {
  logger.error('unhandled application error:', err);
  res.status(500).send(err);
});

// export app
export default app;
