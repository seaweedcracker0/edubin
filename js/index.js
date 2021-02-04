
$(function () {
    var owlslider = jQuery("div.owl-carousel");
    owlslider.each(function () {
        var $this = $(this),
            $items = ($this.data('items')) ? $this.data('items') : 1,
            $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
            $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
            $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
            $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
            $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
            $autowdt = ($this.data('autoWidth')) ? $this.data('autoWidth') : true,
            $space = ($this.attr('data-space')) ? $this.data('space') : 20;

        $(this).owlCarousel({
            loop: $loop,
            items: $items,
            responsive: {
                0: { items: $this.data('xx-items') ? $this.data('xx-items') : 1 },
                480: { items: $this.data('xs-items') ? $this.data('xs-items') : 1 },
                768: { items: $this.data('sm-items') ? $this.data('sm-items') : 2 },
                980: { items: $this.data('md-items') ? $this.data('md-items') : 3 },
                1200: { items: $items }
            },
            dots: $navdots,
            autoHeight: $autohgt,
            margin: $space,
            nav: $navarrow,
            navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
            autoplay: $autoplay,
            autoplayHoverPause: true,
        });

    });
});


(function() {
    var questions = [{
    question: "Who was the first President of the United States?",
    choices: ["Me", "He", "She", "Naji", "You"],
    correctAnswer: 2
    }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
    }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
    }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
    }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
    }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
        return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
    } else {
        questionCounter++;
        displayNext();
    }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
        return false;
    }
    choose();
    questionCounter--;
    displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
        return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
    $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });
    
        var header = $('<div class="question-sequence-title"><h5>Question ' + (index + 1) + ':</h5>');
        qElement.append(header);
        
        var question = $('<div class="question-title"><p>').append(questions[index].question);
        qElement.append(question);
        
        var radioButtons = createRadios(index);
        qElement.append(radioButtons);
        
        return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul class="question-option">');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" id="option' + i + '" name="answer" value=' + i + ' />';
            //input += questions[index].choices[i];
            input += '<label for="option' + i + '">' + questions[index].choices[i] + '</label>';
            input += '<div class="check"></div>';
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
    quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
            $('#prev').show();
        } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
        }
        }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        }
    });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
            numCorrect++;
        }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!');
        return score;
    }
})();


// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          //cart[item].count ++;
          cart[item].count = 1;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    var total = "";
    var cartoutput = "";
    var tableoutput = "";

    for(var i in cartArray) {
      output += "<li>"
        + "<img src='images/avatar-111.jpg' alt=''>"
        + "<h5 class='title'>" + cartArray[i].name + "</h5>"
        + "<span class='qty'>Quantity: " + cartArray[i].count + "</span>"
        + "<span class='price-st'> $" + cartArray[i].price + "</span>"
        + " <a href='' class='link'></a>"
        + "</li>";

      total = "Total: <span>$ " + cartArray[i].total + "</span>"

      tableoutput += "<tr>"
     
        + '<td><img src="images/avatar-111.jpg" alt=""'
        + 'width="80"></td>'
        + '<td>' + cartArray[i].name + '</td>'
        + '<td>' + cartArray[i].count +'</td>'
        + '<td>$' + cartArray[i].price + ' <button class="btn btn-danger delete-item"  data-name="' + cartArray[i].name + '"  style="float: right;">Remove</button></td>'
        + '</tr>';

        cartoutput += "<tr>"
        + '<td><img src="images/avatar-111.jpg" alt="" width="80"></td>'
        + '<td>'
        + '<h5>Cisco Certified Network Associate</h5>'
        + '<p>Lorem Ipsum available the majority have suffered alteration in some.</p>'
        + '</td>'
        + '<td>$270</td>'
        + '<td>'
        + '<input type="number" class="form-control" placeholder="1" min="0" max="5">'
        + '</td>'
        + '<td align="center" class="font-weight-900">$270</td>'
        + '<td align="center">'
        + '<button class="btn btn-danger delete-item"  data-name="' + cartArray[i].name + '"  style="float: right;">Remove</button>'
        + '</td>'
        + '</tr>'
    }

    $('.shopping-cart .cart-body ul').html(output);
    $('.shopping-cart .cart-header .total-price').html(total);

    $('.shopping-cart-section .shopping-cart-section-body').html(cartoutput);
    $('.shopping-cart-section .shopping-cart-section-total').html(total);

    $('.shopping-checkout-box .shopping-checkout-body').html(tableoutput);
    $('.shopping-checkout-box .shopping-checkout-total').html(total);

    $('.shopping-bag-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.shopping-checkout-box').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })

  $('.shopping-cart-section').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  