import React from 'react'
import {useEffect, useState} from 'react';

export const List = () => {
  const [initialState, setIntialState] = useState([])
  useEffect(() => {
    fetch('/api').then( res => {
      if(res.ok){
       return res.json();
       }
    }).then(jsonResponse => setIntialState(jsonResponse.list))
  },[])
  console.log(initialState)

    const switchMetaData  = (e => {
      var html = document.getElementById('metadataContainer' + e.target.id.split("_")[1]).innerHTML;
    var domObj = document.getElementById('metadataExtrenalContainer');
      domObj.innerHTML = html;
      domObj = null
    });
  
  
  
  return (

<div id="container">
{initialState && initialState.map(val => 
<div class="resultContainer">
<div class="nameContainer">
<span class="infoContainer">
{ val.name && <span class="NameTitle" id={'name_'+ val.id} onClick={switchMetaData}>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  { val.name}</span>}
<div class="metadataContainer" id={'metadataContainer' + val.id }>
 <div class="metaDataOne">
 <div class="altNameContainer">
{ val.name && <span class="NameTitleMetaData" id={'name_'+ val.id}>  {val.name}</span>}
{ val.alternativeTitles && val.alternativeTitles.map(title =>  <div class="altTitles" id={'alt_' + val.id + title}>{title}</div>) }
  </div>
  <div class="imageContainer">
   {val.images && val.images.map(i =>  <img class="image" id={'image_' + val.id + '_' + (val.images.length - 1)} src={i.src} />) }
  </div>
  {val.NumberEpisodes && <div class="NumberEpisodes" id={'NumberEpisodes_'+ val.id}> Number of Episodes :{val.NumberEpisodes}</div>}
  {val.generatedOn && <div class="generatedOn" id={'generatedOn' + val.id}> Generated On: {val.generatedOn}</div>}
  {val.vintage && <div class="vintage" id={'vintage_' + val.id}> Vintage : {val.vintage}</div>}
  {val.premiereDate && <div class="premiereDate" id={'premiereDate_' + val.id}> Premiere Date:{val.premiereDate}</div>}
  <span class="label">  INFO From&nbsp;</span>
  {val.id && <a target="blank" class="animenewsnetwork" href={'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=' + val.id} id={'link_' + val.id}>Anime News Network</a>}
   {val.precision && <span class="label"> Official {val.precision} Website </span>}
  
    
   {val.officialWebsite.t && <a class="officialWebsite" target="blank" id={'officialWebsite_'+ val.id} href={val.officialWebsite.href}> {val.officialWebsite.t}</a> }
   
  {val.officialWebsite.href &&  <a class="officialWebsite" target="blank" id={'officialWebsite_' + val.id} href={val.officialWebsite.href}> { val.officialWebsite.href}</a>}
 {val.precision &&  <div class="Precision" id={'precision_'+ val.id} > Media Type:  {val.precision}</div>}
  {val.summary &&  <div class="Summary" id={'Summary_' + val.id}>  Summary : {val.summary}</div>}
  
  {val.nbVotes && <div class="ratings" id={'ratings_'+val.id}> Rating Num of votes {val.nbVotes} weighted Score {val.weightedScore} bayesian Score {val.bayesian_score}</div>}
  


<div class="metadataTwoListsContianer">
  <div> Lists</div>
  <div class="metadataTwoLists">
    <div class="themeContainer">
    <div> Themes</div>
       {val.themes && val.themes.map(theme =>  <div class="themes">{theme}</div>) }
    </div>
    
  </div>
  <div class="GenresContainer">
  <div> Genres</div>
      { val.generes && val.generes.map(genere =>  <div class="generes">{genere}</div>) }
            
  </div>

  <div class="openingThemeContainer">
  <div> Opening Themes</div>
      { val.openingTheme && val.openingTheme.map(openingt =>  <div class="openingTheme">{openingt}</div>) }
  </div>
                      
</div>

<div class="endingThemeContainer">
<div>  Ending Themes</div>
      { val.endingTheme && val.endingTheme.map(endingt =>  <div class="endingTheme">{endingt}</div>)}           
</div>
<div class="relatedContainer">
<div> Related Previous</div>
       {val.relatedPrevList && val.relatedPrevList.map(relatedPrevListVal =>  <div id="related_{relatedPrevListVal.id}" class="related-prev">{relatedPrevListVal.rel}</div>)  }         
       
</div>

<div class="episodeContainer">
<div> Episodes</div>
      { val.episodeList && val.episodeList.map(epsVal =>  <div id={'episode_' + epsVal.gid} class="episode"> {epsVal.num + ", " + epsVal.title}</div>) }          
       
          
</div>

<div class="castContainer">
<div> Cast</div>
  {val.castFictionList && val.castFictionList.map(castVal =>  <div class="cast" id={'cast_' + castVal.gid}>{castVal.role + "is " + castVal.name}</div>)  }
          
</div>


<div class="creditsContainer">
<div> Credits</div>
 { val.creditsList && val.creditsList.map(creditsVal =>  <div class="credits" id={'credits_' + creditsVal.gid}>{creditsVal.task + " is " + creditsVal.name}</div>)  }
          
</div>
<div class="staffContainer">
 <div> Staff</div>
  {val.staffList && val.staffList.map(staffVal =>  <div class="staff" id={'staff_' + staffVal.gid}>{staffVal.task + ", " + staffVal.name}</div>)  }
          
</div>
<div class="newsContainer">
<div> News</div>
 { val.newsList && val.newsList.map(newsVal =>   <a class="news"  target="blank"  href={newsVal.href} id={'news_'+ newsVal.gid}>{newsVal.datetime + ", " + newsVal.text}</a>)  }
          
</div>

<div class="reviewContainer">
<div> Reviews</div>
<div class="review_item">

  {val.reviewList && val.reviewList.map(reviewVal =>   <a class="review"  target="blank"  href={reviewVal.href} id={'review_'+reviewVal.gid}>{reviewVal.title}</a>)  }

</div>

</div>
                      

</div>

</div>
</span>

</div>


</div>)}

</div> )
   
}


//{url: `http://localhost:3000`}