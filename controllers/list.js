
var xml = require("sax-parser");

var sync = require('sync-request');


class my_xml_parser {

  constructor() {
    this.textRet = "";
    this.info = {};
    this.list = [];
    this.news = {};
    this.staff = {};
    this.person = {};
    this.credit = {};
    this.episode = {};
    this.review = {};
    this.cast = {};
    this.temp = {};

    this.infoSeen = false;
    this.newsSeen = false;
    this.taskSeen = false;
    this.reviewSeen = false;
    this.personSeen = false;
    this.titleSeen = false;
    this.staffSeen = false;
    this.roleSeen = false;
    this.creditSeen = false;
    this.castSeen = false;
    this.companySeen = false;
    this.currentTagName = "";

  }


  getList(){
    return this.list;

  }

  isEmpty(obj) {
    for (var o in obj)
      if (o) return false;
    return true;
  }


  endDoc() {

    try {
      if (this.temp) {
        if(!this.isEmpty(this.temp )) {
          this.list.push(this.temp);
          this.temp = {};
        }
      }
    } catch (err) {
      var h = 0;
    }


  }


  onMyOpenTag(elem, attr, prefix, uri, namespaces) {

    var attributes = {};
    try {

      for (var counter = 0; counter<attr.length; counter++) {
        attributes[attr[counter][0]] = attr[counter][1];

      }
      switch (elem) {
        case "manga":
          if (this.temp) {
            if(!this.isEmpty(this.temp )) {
              this.list.push(this.temp);
              this.temp = {};
            }
          }
          this.temp = {
            name: attributes.name,
            type: attributes.type,
            gid: attributes.gid,
            id: attributes.id,
            precision: attributes.precision,
            generatedOn: attributes.generatedOn,
            infolist: [],
            newsList: [],
            staffList: [],
            reviewList: [],
            images: [],
            castFictionList: [],
            creditsList: [],
            relatedPrevList: [],
            alternativeTitles: [],
            mainTitle: "",
            summary: "",
            generes: [],
            themes: [],
            NumberEpisodes: "",
            vintage: "",
            officialWebsite: {},
            premiereDate: "",
            openingTheme: [],
            endingTheme: []

          };
          break;
        case "anime":
          if (this.temp) {
            if(!this.isEmpty(this.temp )) {
              this.list.push(this.temp);
              this.temp = {};
            }
          }
          this.temp = {
            name: attributes.name,
            type: attributes.type,
            gid: attributes.gid,
            id: attributes.id,
            precision: attributes.precision,
            generatedOn: attributes.generatedOn,
            infolist: [],
            images: [],
            newsList: [],
            staffList: [],
            episodeList: [],
            reviewList: [],
            creditsList: [],
            castFictionList: [],
            relatedPrevList: [],
            alternativeTitles: [],
            mainTitle: "",
            summary: "",
            generes: [],
            themes: [],
            NumberEpisodes: "",
            vintage: "",
            officialWebsite: {},
            premiereDate: "",
            openingTheme: [],
            endingTheme: []
          };
          break;
        case "related-prev":
          this.temp.relatedPrevList.push({rel: attributes.rel, id: attributes.id})
          break;
        case "img":
          this.temp.images.push({src: attributes.src, width: attributes.width, height: attributes.height})
          break;
        case "info":
          this.infoSeen = true;
          this.info.gid = attributes.gid;
          this.info.my_type = attributes.type;
          this.info.lang = attributes.lang;
          this.info.href = attributes.href;
          if (this.info.my_type == "Picture") {
            this.temp.images.push({src: attributes.src, width: attributes.width, height: attributes.height})
          }
          break;
        case "ratings":
          this.temp.nbVotes = attributes.nb_votes;
          this.temp.weightedScore = attributes.weighted_score;
          this.temp.bayesian_score = attributes.bayesian_score;
          break;
        case "news":
          this.newsSeen = true;
          this.news.datetime = attributes.datetime;
          this.news.href = attributes.href;

          break;
        case "staff":
          this.staffSeen = true;
          this.staff = {gid: attributes.gid};
          break;
        case "task":
          this.taskSeen = true;
          break;
        case "person":
          this.personSeen = true;
          this.staff.id = attributes.id;
          break;
        case "episode":
          this.episode = {};
          this.episode.num = attributes.num;
          break;
        case "title":
          this.titleSeen = true;
          this.episode.gid = attributes.gid;
          this.episode.lang = attributes.lang;
          break;

        case "review":
          this.reviewSeen = true;
          this.review = {"href": attributes.href}
          break;
        case "cast":
          this.castSeen = true;
          this.cast = {gid: attributes.gid, lang: attributes.lang}
          break;
        case " role":
          this.roleSeen = true;
          break;
        case "credit":
          this.creditSeen = true;
          this.credit = {gid: attributes.gid}
          break;
        case "company" :
          this.companySeen = true;
          this.credit.id = attributes.id;

          break;


      }
    } catch (error) {
      var f = 0;

    }

  }


  onText(chars) {
    var t = chars;
    try {
      let i = 0;
      if (this.infoSeen) {
        this.info.text = t;
        switch (this.info.my_type) {
          case "Main title" :
            this.temp.mainTitle = this.info.text;
            break;
          case "Alternative title":
            this.temp.alternativeTitles.push(this.info.text);
            break;
          case "Plot Summary" :
            this.temp.summary = this.info.text;
            break;
          case "Themes" :
            this.temp.themes.push(this.info.text);
            break;
          case "Genres" :
            this.temp.generes.push(this.info.text);
            break;
          case "Number of episodes" :
            this.temp.NumberEpisodes = this.info.text;
            break;
          case "Vintage" :
            this.temp.vintage = this.info.text;
            break;
          case "Opening Theme" :
            this.temp.openingTheme.push(this.info.text);
            break;
          case "Ending Theme" :
            this.temp.endingTheme.push(this.info.text);
            break;
          case "Premiere date" :
            this.temp.premiereDate = this.info.text;
            break;
          case "Official website" :
            this.temp.officialWebsite = {t: this.info.text, href: this.info.href};
        }

        this.temp.infolist.push(this.info);
        this.info = {};
        this.infoSeen = false;
      }
      if (this.newsSeen) {
        this.news.text = t;
        this.temp.newsList.push(this.news);
        this.news = {};
        this.newsSeen = false;
      }
      if (this.taskSeen) {
        this.staff.task = t;
        this.taskSeen = false;


      }
      if (this.personSeen) {
        if (this.castSeen) {
          this.cast.name = t;
          if (this.cast.name && this.cast.role) {
            this.temp.castFictionList.push(this.cast);
            this.cast = {};
          }
          this.personSeen = false;
          this.castSeen = false;
        } else {
          this.staff.name = t;
          this.temp.staffList.push(this.staff);
          this.personSeen = false;
          this.staff = {};

        }

      }
      if (this.titleSeen) {
        this.episode.title = t;
        this.temp.episodeList.push(this.episode);
        this.titleSeen = false;
        this.episode = {};

      }
      if (this.reviewSeen) {
        this.review.title = t;
        this.temp.reviewList.push(this.review);
        this.reviewSeen = false;
      }
      if (this.roleSeen) {
        this.cast.role = t;
        if (this.cast.name && this.cast.role) {
          this.temp.castFictionList.push(this.cast);
          this.cast = {};
        }
        this.roleSeen = false;
      }
      if (this.creditSeen) {
        this.credit.task = t;
        this.creditSeen = false;
      }

      if (this.companySeen) {
        this.credit.name = t;
        this.companySeen = false;
        this.temp.creditsList.push(this.credit);
      }

    } catch (err) {
      var s = 0;
    }

  }
}


class mainParse{

  constructor() {

    this.p_xml = new my_xml_parser();
  }

    getData(){return this.p_xml.getList();}

  parseDetailsAndSearch(body) {
    var xmlBody= body;
    var theParser =  this.p_xml;

      try{
        var parser = new xml.SaxParser(function (){


          var currentParser =  theParser;
          return function(cb) {

            cb.onStartDocument(function () {
            });

            cb.onEndDocument(function () {
              var obj_my = currentParser;
              return function () {
                obj_my.endDoc();
              }
            }());
            cb.onStartElementNS(function () {
              var obj_my = currentParser;
              return function (elem, attr, prefix, uri, namespaces) {
                obj_my.onMyOpenTag(elem, attr, prefix, uri, namespaces);
              }
            }());
            cb.onCharacters(function () {
              var obj_my = currentParser;
              return function (chars) {
                obj_my.onText(chars);
              }
            }());
            cb.onError(function (msg) {

              console.log("<ERROR>" + JSON.stringify(msg) + "</ERROR>");

            });
          }
        }())
        parser.parseString(xmlBody);
        }catch(error){
            var ui = 0;
        }    
      //example read from chunks
    }


    }

exports.list = (req, res) => {


 // list = [];
  //ghost%20in%20the%20shell
  var p = new mainParse();
  var responseSYnc, body = "";

  var searchstr = "title=~Blood:%20The%20Last%20Vampire";
 var one = "Blood:%20The%20Last%20Vampire&title=~Akira&title=~Last%20Exile&title=~Hellsing&title=~Monster&title=~Speed%20Grapher&title=~Ergo%20Proxy&title=~Texhnolyze&title=~Shigurui:%20Death%20Frenzy&title=~Darker%20Than%20Black:%20Gemini%20of%20the%20Meteor&title=~Samurai%20Champloo&title=~Gunslinger%20Girl"
  var two = "title=~Cowboy%20Bebop&title=~Neon%20Genesis%20Evangelion&title=~Ghost%20in%20the%20Shell&title=~Initial%20D&title=~Gantz&title=~Karas"
  var three = "title=~Memories&title=~Kite&title=~The%20Animatrix&title=~Vexille";

var idsList0 = "375&title=11&title=2294&title=17085&title=5799&title=5114&title=387&title=32&title=3750&title=1511&title=6926&title=4579&title=6471&title=5115&title=2304&title=7811&title=10984&title=3516&title=2636&title=10121&title=8977&title=2897&title=1555&title=353&title=13&title=18443&title=15576&title=14849&title=11921&title=10760&title=3984&title=2440&title=419&title=418&title=49&title=23102&title=21672&title=16786&title=16698&title=15096&title=14326&title=13466&title=12323&title=8495&title=6717&title=6243&title=5644&title=2081&title=1590&title=1589&title=910&title=465";
var idsList1 = "title=17511&title=16821&title=16073&title=15711&title=14572&title=10222&title=7986&title=3396&title=1559&title=1155&title=1154&title=1153&title=1152&title=395&title=18279&title=18277&title=3749&title=3641&title=5002&title=424&title=7867&title=163&title=7812";

  responseSYnc = sync('GET',`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?` +  idsList0);

  body = responseSYnc.getBody('utf8')
  p.parseDetailsAndSearch(body);

  var listOne =  p.getData();
  responseSYnc = sync('GET',`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?` +  idsList1);

  body = responseSYnc.getBody('utf8')
  p.parseDetailsAndSearch(body);
  var listTwo = p.getData();
  listOne.concat(listTwo);
  /*
  responseSYnc = sync('GET',`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?` +  three);

  body = responseSYnc.getBody('utf8')
  p.parseDetailsAndSearch(body);
  var listThree = p.getData();

*/

  res.json({ title: 'Anime News Network Search Tool',list: listOne });
  
 // res.render('index', { title: 'Express' });
}


exports.search = (req, res) => {
  //ghost%20in%20the%20shell
  var p = new mainParse();
  var responseSYnc, body = "";


  if(req.body.search){
     responseSYnc = sync('GET',`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~`+  req.body.search);

     body = responseSYnc.getBody('utf8')
     p.parseDetailsAndSearch(body);
   // Request.get(encodeURI(`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~`+  req.body.search ), p.parseDetailsAndSearch());
  }else{
     responseSYnc = sync('GET',`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=4199`);
    body = responseSYnc.getBody('utf8')
     p.parseDetailsAndSearch(body);
   // Request.get(`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=4199`, p.parseDetailsAndSearch());
  }


  res.json( { title: 'Anime News Network Search Tool', list: p.getData()});
}

