/** @jsx React.DOM */

var AkhbariTopper = React.createClass({
	getInitialState: function(){
		return {picks:[]}
	},
	componentWillMount: function(){
		var that = this;
    var opts = {
      ok: function(data){
      	if( data.results && data.results.length > 0 ){
          var topPicks = data.results.map(function(pick, index){
						return <AkhbariTopperEntry key={"top_pick_"+pick.id} item={pick}/>;
					});
					that.setState({picks: topPicks});
      	} else {
      		that.setState({picks: []})
      	}
      },
      fail: function(data){
      	that.setState({picks: []});
      }
    };
		app.api.akhbari.top(opts);
	},
	render: function(){
		if( app.authenticated ){
		  var topper = window.__mode.size === 'small' ? <SmallAkhbariTopper data={this.state.picks}/> : 
			  <MediumLargeAkhbariTopper data={this.state.picks}/>
			var specialTag = {scheme:"special", id:"test", label: "Special Tag"};
			var topicTag = {scheme:"topic", id:"test", label: "Topic Tag"};
			var dummyUser = {displayName: "Khaled Bin Hasan", avatar: "/i/avatar.png"};
			var dummyScore = {crown:"gold", score:123};
		  return (
			<header>
			  <header className="head">
			    <div id="highlight-heading">
			    <h2>{i18n.akhbari.top.header}</h2>
			    <span className="link" onClick={this.props.hide}></span>
			    </div>
			    {topper}
			  </header>
			  <header className="head">
			    <div>
			    <h2>{i18n.akhbari.top.discussions}</h2>
			    <Tag tag={specialTag}/><Tag tag={specialTag}/><Tag tag={specialTag}/>
			    <Tag tag={topicTag}/><Tag tag={topicTag}/><Tag tag={topicTag}/>
			    </div>
			    <div>
			    <h2>{i18n.akhbari.top.users}</h2>
			    <AkhbariUser user={dummyUser} score={dummyScore.score} crown={dummyScore.crown}/>
			    <AkhbariUser user={dummyUser} score={dummyScore.score} crown={dummyScore.crown}/>
			    </div>
			  </header>
			</header>
		  );
		} else {
			return <header/>;
		}
	}
});

var SmallAkhbariTopper = React.createClass({
	render: function(){
		return (
		  <Slider className="akhbari-topper" slideInterval={5000}>
		    {this.props.data}
		  </Slider>
		);
	}
})

var MediumLargeAkhbariTopper = React.createClass({
	render: function(){
		return (
		  <div className="akhbari-topper">
		    {this.props.data}
		  </div>
		);
  }
});

var AkhbariTopperImage = React.createClass({
	render:function(){
		var url = undefined;
		if( this.props.src ) { 
			url =  this.props.src;
		}
		else if (this.props.media) { 
			url = app.getImageUrl(this.props.media.id, this.props.media.modified, 320, 240); 
		}
		return (
			<Image src={url} placeholder="/i/tour-news.jpg"/>
		);
	}
});

var AkhbariTopperEntry = React.createClass({
	render: function(){
		var route = app.routes.article;
		var params = [{ name: 'id', value: this.props.item.id }];
		var thumbnail = undefined;
		if (this.props.item.media && this.props.item.media.length > 0 ){
			thumbnail = <AkhbariTopperImage media={this.props.item.media[0]}/>
		} else if (this.props.item.video) {
		  var url = app.config.urls.image + '/i/video-placeholder.png';
      thumbnail = <AkhbariTopperImage src={url}/>
		} else {
			thumbnail = <AkhbariTopperImage/>;
		}
		return (
			<Route route={route} params={params}>
			<div>
			  {thumbnail}
			  <div>
			  	<h2>{this.props.item.title}</h2>
			    <PreviewMeta data={this.props.item}/>
			  </div>
			</div>
			</Route>
		);
	}
});

var AkhbariUser = React.createClass({
	handleClick: function(){
		
	},
	render: function(){
		return (
			<div className="top-user" onClick={this.handleClick}>
        <span className="user link" onClick={this.handleClick}>
          <Avatar avatar={this.props.user.avatar}/>
          <span>{this.props.user.displayName}</span>
        </span>
        <Badge score={this.props.score} crown={this.props.crown}/>
      </div>
		);
	}
});