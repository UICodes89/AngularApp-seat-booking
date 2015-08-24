Assignment=angular.module("Assignment", []);
Assignment.controller("assignmentController", function( $scope, get, set){
 $scope.count=6;
 $scope.countrow=7;
 $scope.countfour=4;
 $scope.countseat=0;
 $scope.rowcount=0;
 $scope.selectedClass=0;
 $scope.noofticket=0;
 $scope.finalSubmit=true;
 $scope.listItem=[
 { name:"Manoj Shukla", 
   nofSeat:"3", 
   seatpos:[
    {ticket:"8C"},{ticket:"9E"},{ticket:"4G"}
	]
 }];
 $scope.setClass=function(){
     for(var i=0; i<$scope.listItem.length;i++){
	    for(var j=0;j<$scope.listItem[i].seatpos.length; j++){
		  set.classSet($scope.listItem[i].seatpos[j].ticket);
		}
	 }
  };
 $scope.numberOf=function(number){
    return get.getNumber(number);
  };/* no of row and seats*/
 $scope.verticleList=function(row, index){
    return get.getletter(row, index);
  };
  
  $scope.addinlist=function(){
    
    $scope.listItem.push({ 
	       name:$scope.user, 
		   nofSeat:$scope.noofticket,
           seatpos:[]		   
		 });
	$scope.addAt=parseInt($scope.listItem.length);
	$scope.addAt--;
	$("li a").each(function(index){
	 if($(this).hasClass("success")){
	 $scope.curTitle=$(this).attr("title");
	 $scope.templist={"ticket":$scope.curTitle};
	 $(this).removeClass("success").addClass("booked");
	 $scope.listItem[$scope.addAt].seatpos.push($scope.templist);
	 
	} 
	
});

    $scope.user='';
	$scope.noofticket=0;
	$(document).ready(function(){
		  $(".btn-success").attr('disabled','disabled');
		});
 };
/* for verticle alphabetical list*/
  $scope.indexno=function(row){
     $scope.countseat ++;
		 if($scope.countseat>=17){
			$scope.countseat=1;
			$scope.rowcount++;
			if($scope.rowcount>=7){
			 $scope.rowcount=null;
			}
			return $scope.countseat + $scope.verticleList(row, $scope.rowcount);
		}
		else{
		     return $scope.countseat + $scope.verticleList(row, $scope.rowcount);
		}
		
		
 };
  $(document).ready(function(){
    $("input[type=text]").focus();
    $(".seats ul li a").each(function(index){
	 $(this).prop('title', $(this).text());
	 $(this).text('');
	});
	
   $(".seats ul li a").on("click", function(){
      
     if($(this).hasClass("booked")){
	     alert("Please choose other seat this is already booked");
	   }
	   else if($(this).hasClass("success")){
	    $(this).removeClass("success");
		$scope.selectedClass=$scope.selectedClass-1;
	   }
	 else{ 
	       $scope.selectedClass=get._howMany($scope.selectedClass, $scope.noofticket);
		   $scope.check=$scope.selectedClass;
			if(++$scope.check==$scope.noofticket){$(".btn-success").removeAttr('disabled');} 
			 if($scope.selectedClass< $scope.noofticket && $scope.noofticket>0){
				$(this).toggleClass("success");
			}else{
				 if($scope.noofticket==0){
					alert("please set the no of seat you wants to book");
				 }else{
				    alert("Do you want to book more than"+" "+$scope.noofticket+" "+" seats. please set how many seats you wants to book");
				 }
			  }
			  
			 $scope.selectedClass=0; 
			   
		} 
	});
    
  });
  /*seat selection*/
  $scope.setClass();
});
Assignment.service("set", function(){
   this.classSet=function(className){
     $(document).ready(function(){
	     $("li a").each(function(index) {
			if($(this).attr('title')==className){
			$(this).addClass("booked");
		   } 
		 });
	 });
   };
   
 });
Assignment.factory("get", function(){
  var fact={};
  fact.getNumber=function(number){
  return  new Array(number); 
  };/*return array for ng-repeat*/
  fact.getletter=function(row, index){
    var val=row.charCodeAt(0);
	val=val-index;
	val=String.fromCharCode(val);
  return val; 
  };/* dynamic char for ng-repeat*/
  fact._howMany=function(selectedClass, noofticket){
    
    $(".seats ul li a").each(function(index) {
			 if($(this).hasClass("success")){
			    if(selectedClass<noofticket)
			    selectedClass++;
					}
			});
		return selectedClass;	
  }
  return fact;
});