// npm packages
import cors from 'cors';
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

app.get('/api/tweet', cors(), (req, res) => {
  // get all tweets
  pool.query('SELECT tweets.username, tweets.text, tweets.timestamp, accounts.fullname FROM tweets JOIN accounts ON tweets.username = accounts.username;', (err, result) => {
    res.json(result.rows);
  });
});

app.get('/api/tweet/:username', cors(), (req, res) => {
  // get all tweets by user
  const username = req.params.username;

  pool.query(`SELECT * FROM tweets WHERE username = '${username}';`, (err, result) => {
    res.json(result.rows);
  });
});

app.get('/api/hashtags', cors(), (req, res) => {
  // get all tweets
  pool.query('SELECT * FROM hashtags;', (err, result) => {
    res.json(result.rows);
  });
});

app.get('/create', (req, res) => {
  // create the database tables
  pool.query('CREATE TABLE accounts (username varchar(16) PRIMARY KEY, fullname varchar(50) NOT NULL, email varchar(50), join_date timestamp DEFAULT CURRENT_DATE, bio varchar(300));\
  CREATE TABLE tweets (username varchar(16) NOT NULL, text varchar(140) NOT NULL, timestamp timestamp NOT NULL DEFAULT CURRENT_DATE, tweet_id SERIAL PRIMARY KEY);\
  ALTER TABLE tweets ADD CONSTRAINT fk1 FOREIGN KEY (username) REFERENCES accounts (username);\
  CREATE TABLE hashtags (text varchar(50) PRIMARY KEY);\
  CREATE TABLE usages (tweet_id int NOT NULL, text varchar(50) NOT NULL);\
  ALTER TABLE usages ADD CONSTRAINT fk2 FOREIGN KEY (tweet_id) REFERENCES tweets (tweet_id);\
  ALTER TABLE usages ADD CONSTRAINT fk3 FOREIGN KEY (text) REFERENCES hashtags;\
  ALTER TABLE usages ADD PRIMARY KEY (tweet_id, text);', (err, result) => {
      if (err) {
        logger.error(err.message);
      }
    });

  res.send('Created the database tables');
});

app.get('/insert', (req, res) => {
  // insert accounts and tweets into the database
  // BBCWorld tweets
  pool.query(`INSERT INTO accounts (username, fullname, email, bio) VALUES ('BBCWorld', 'BBC News (World)', 'news@bbc.com', 'News, features and analysis from the World''s newsroom. Breaking news, follow @BBCBreaking. UK news, @BBCNews. Latest sports news @BBCSport');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (1, 'BBCWorld', 'US military drops ''mother of all bombs on IS'' in Afghanistan');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (2, 'BBCWorld', 'How Rosa Parks'' house moved 4,000 miles');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (3, 'BBCWorld', 'Migrant crisis: ''Nearly 100 missing after Libya boat sinks''');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (4, 'BBCWorld', 'Trump''s Mar-a-Lago kitchen cited for food safety violations');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (5, 'BBCWorld', 'Trump reverses course in 24 hours from Nato to China to Fed');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  // DailyCollegian tweets
  pool.query(`INSERT INTO accounts (username, fullname, email, bio) VALUES ('DailyCollegian', 'The Daily Collegian', 'editor@collegian.psu.edu', 'Independent student newspaper bringing you the latest from the Penn State community since 1887. Got news? Tweet at us.');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (6, 'DailyCollegian', 'Jake Pilewicz picked up win in first collegiate start as @PennStateBASE took down Bucknell Wednesday');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (7, 'DailyCollegian', 'Penn State Assistant Dean for Multicultural Affairs in the @PSUCollegeComm Joseph Selden retiring after 23 years');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (8, 'DailyCollegian' , 'Penn State employees curated digital data collections including government climate science data at risk of removal');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (9, 'DailyCollegian' , 'JUST IN: Reilly Ebbs is confirmed unanimously as the next @UPUA chief justice');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (10, 'DailyCollegian' ,  'With a budget of $140,000, @UPUA will vote on how to allocate the money at tonight''s meeting');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  // FCBayern tweets
  pool.query(`INSERT INTO accounts (username, fullname, email, bio) VALUES ('FCBayern', 'FC Bayern München', 'fanshop@fcb.de', 'Offizielle Seite des #FCBayern Intl: @FCBayernEN | @FCBayernES | @FCBayernUS | @FCBayernAR Fans: @FCBayern_FB | Nachwuchs: @FCBjuniorteam | Frauen: @FCBfrauen');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (11, 'FCBayern' , 'Zurück in München! Gute Nacht! #B04FCB');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (12, 'FCBayern' , 'Wir haben mit großer Intensität gespielt, hatten viele Möglichkeiten. Aber manchmal passiert so ein Unentschieden.');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (13, 'FCBayern' , '.@David_Alaba weiter: ''Wir haben noch ein paar Tage bis #RMAFCB, wir glauben an uns und sind motiviert.'' #B04FCB');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (14, 'FCBayern' , '''Wir haben an sich ein gutes Spiel gemacht, aber die Chancen-Auswertung war fatal. Deswegen sind wir unzufrieden.'' @esmuellert_ #MiaSanMia');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (15, 'FCBayern' , 'Wie immer DANKE an alle #FCBayern-Fans für die überragende Unterstützung! Wir freuen uns auf Dienstag mit EUCH! #MiaSanMia');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  // AP tweets
  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('AP', 'The Associated Press', 'news from The Associated Press, and a taste of the great journalism produced by AP members and customers.');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (16, 'AP', 'Some British legislators want to revoke UK citizenship of Syrian president''s wife, Asma Assad');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (17, 'AP', 'Christians in Middle East celebrate Easter in midst of war, religious violence, discrimination');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (18, 'AP', 'Ex-governor of Mexico''s Veracruz, detained in Guatemala on money laundering, organized crime charges');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (19, 'AP', 'The Latest: US says North Korea fired a medium-range missile and it exploded 4-5 seconds after launch');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (20, 'AP', 'U.S Military seeks civilians with high-tech skills in fight against Islamic State group');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  // Iraqi Day tweets
  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('iraqi_day', 'Iraqi Day', 'Viral and Trending Iraq news • Focused on Iraqi Affairs • اخبار العراق My loyalty belongs to #Iraq only and not the political game.');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO tweets (tweet_id, username, text) VALUES (21, 'iraqi_day', '#BREAKING #Iraqi intelligence arrested a #ISIS militant in west #Baghdad that was gathering information on checkpoint & pilgrims movement.');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  // extra accounts
  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('kanyewest', 'Kanye West', 'KANYEWEST.COM');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('Amy_Siskind', 'Amy Siskind', 'Amy Siskind, President and Co-Founder of The New Agenda. Siskind is an advocate for women''s, LGBTQ rights, equality. http://bit.ly/2d0BuwB');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('rihanna', 'Rihanna', 'Get #ANTI now: http://smarturl.it/daANTI');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('JustinTrudeau', 'Justin Trudeau', 'Account run by the 23rd Prime Minister of Canada and staff… Compte géré par le 23e premier ministre du Canada et personnel.');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO accounts (username, fullname, bio) VALUES ('penn_state', 'Penn State', 'The official Twitter account of Penn State. #PennState');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  // hashtags
  pool.query(`INSERT INTO hashtags VALUES ('#FCBayern');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#B04FCB');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#RMAFCB');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#MiaSanMia');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#Assad');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#MiddleEast');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#Baghdad');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#Iraqi');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#ISIS');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  pool.query(`INSERT INTO hashtags VALUES ('#BREAKING');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }
  });

  res.send('Inserted accounts, tweets, and hashtags into the database');
});

app.get('/export', (req, res) => {
  // export accounts table 
  pool.query(`SELECT table_to_xml('accounts', true, false, '');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }

    console.log(result.rows[0]['table_to_xml']);
  });

  // export tweets table 
  pool.query(`SELECT table_to_xml('tweets', true, false, '');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }

    console.log(result.rows[0]['table_to_xml']);
  });

  // export hashtags table 
  pool.query(`SELECT table_to_xml('hashtags', true, false, '');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }

    console.log(result.rows[0]['table_to_xml']);
  });

  // export usages table 
  pool.query(`SELECT table_to_xml('usages', true, false, '');`, (err, result) => {
    if (err) {
      logger.error(err.message);
    }

    console.log(result.rows[0]['table_to_xml']);
  });

  res.send('Output xml to console');
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
