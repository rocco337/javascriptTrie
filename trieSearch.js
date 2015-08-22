function trieSearch(){
	var self = this;

	//internal class for holding trie nodes
	function nodeClass(value){
		var self = this;
		
		self.value = value;				
		self.children=[];
	};

	//inititate root node
	self.root = new nodeClass('');
	self.lastSearchResult = [];

	//adds new value to the trie
	self.add = function(term,parent){		
		if(!parent)
			parent = self.root;

		//iterate troguh every character and create structure
		for(var ii=0;ii<term.length;ii++)
		{
			//try to find nodewith current value
			var node = parent.children.filter(function(m){
				return m.value===term[ii];
			});

			node = node ? node[0] : undefined;

			//insert new node if node with current value doesn't exist
			if(!node){
				node = new nodeClass(term[ii]);
				parent.children.push(node);
			}

			parent = node;			
		}
	};

	self.search = function(term,parent){
		//convert to lowercase. This makes search case insensitive
		term = term.toLowerCase();

		if(!parent)
			parent = self.root;

		//if search term is not provided then no values are returned
		if(!term)
			return;

		//find end part of search term
		for(var ii=0;ii<term.length;ii++){
	      parent = parent.children.filter(function(m){
	      	 return m.value.toLowerCase() == term[ii];
	      });

		  parent = parent ? parent[0] : undefined;

	      if (!parent) return null;
	    }

	    return parent;
	};

	self.searchWords= function(term,parent){
		if(!parent)
			parent = self.root;

		var top = self.search(term,parent);
		if(!top)
			return [];

		var words =[];		
		function getWords(parent,word){
			word +=parent.value;

			parent.children.forEach(function (child){
				getWords(child,word);
			});

			if(!parent.children.length)
				words.push(word);
		};

		top.children.forEach(function (node) {
	      getWords(node,term);
	    });
	    
		self.lastSearchResult = words;
	    return words;
	};	

	self.autoComplete = function() {
		return self.lastSearchResult ? self.lastSearchResult[0] : [];
	}
};

trie = new trieSearch();

addTestData(trie);

function getTrie()
{
	return trie;
}






