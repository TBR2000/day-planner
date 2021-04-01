var today = moment();
$("#current-date").text(today.format("Do MMM, YYYY"));
const now = moment().format('MMMM Do YYYY');
let nowHour24 = moment().format('H');
let nowHour12 = moment().format('h');
let $plannerDiv = $('#time-block');
let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

if (storedPlans !== null) {
  planTextArr = storedPlans;
}else {planTextArr = new Array(9);}

// clear elements
$plannerDiv.empty();

 // build calendar by hours
 for (let hour = 9; hour <= 17; hour++) {
    // array use offset from hour
    let index = hour - 9;
    
    //row components
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.addClass('present')
    $rowDiv.attr('hour-index',hour);
  
    //Time box of row
    let $col2Time = $('<div>');
    $col2Time.addClass('col-md-2');
  
    // create hour 
    const $hourSpn = $('<span>');
    $hourSpn.attr('class','hour');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate hour
    $hourSpn.text(`${displayHour} ${ampm}`);

    // inset hour
    $rowDiv.append($col2Time);
    $col2Time.append($hourSpn);
    
    // build row components
    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','row');

    // access index from data array for hour 
    $dailyPlanSpn.val( planTextArr[index] );
    
    // create col to control width
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);

      //save of row
      let $col1Save = $('<div>');
      $col1Save.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"saveBtn; far fa-save saveIcon");
     
      
      // add col width and row component to row
      $rowDiv.append($col1Save);
      $col1Save.append($saveBtn);
       
      //color based on time
      updateRow();
      
      // add row 
      $plannerDiv.append($rowDiv);
    };
    
  
    function updateRow ($hourRow,hour) {
      console.log(nowHour24, hour)
    
    if ( hour < nowHour24) {
      $hourRow.removeclass('present')
      $hourRow.setclass('past')
    } else if ( hour > nowHour24) {
      $hourRow.removeclass('present')
      $hourRow.setclass('future')
    } 
    
  };

  $(document).on('click','i', function(event) {
    event.preventDefault(); 
    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;

    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  