
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { SubscriptionService } from 'src/services/subscription.service';

// declare var Razorpay: any;
// @Component({
//   selector: 'app-subscription',
//   templateUrl: './subscription.component.html',
//   styleUrls: ['./subscription.component.css']
// })

// export class SubscriptionComponent implements OnInit {

//   constructor(private subscriptionService: SubscriptionService, private router: Router) {}

//   ngOnInit(): void {}

//   subscribe() {
//     console.log("Subscription process started...");

//     let options = {
//       "key": "rzp_test_rPVpoELQpw9Mm5",
//       "amount": 49999,
//       "currency": "INR",
//       "name": "Property Subscription",
//       "description": "Unlock agent contact details",
//       "handler": (response: any) => {
//         console.log("Payment successful! ID: ", response.razorpay_payment_id);
//         alert("Payment successful! Transaction ID: " + response.razorpay_payment_id);

//         this.subscriptionService.setSubscription(true);
//         this.router.navigate(['/']);
//       },
//       "prefill": {
//         "name": "User Name",
//         "email": "user@example.com",
//         "contact": "9876543210"
//       }
//     };

//     let rzp = new Razorpay(options);
//     rzp.open();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/services/subscription.service';

declare var Razorpay: any;

interface SubscriptionPlan {
  name: string;
  description: string;
  price: number; // Price in paise
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptionPlans: SubscriptionPlan[] = [
    {
      name: 'Silver Plan',
      description: 'Unlock the potential of your business with our Silver Plan. Enjoy unlimited access to agent contact details, empowering you to connect with the right professionals effortlessly.',
      price: 49900 // Price in paise (₹499)
    },
    {
      name: 'Golden Plan',
      description: 'Elevate your networking game with our Golden Plan. Gain unlimited access to agent contact details and exclusive insights that will help you make informed decisions.',
      price: 59900 // Price in paise (₹599)
    },
    {
      name: 'Diamond Plan',
      description: 'Experience the ultimate in connectivity with our Diamond Plan. Enjoy unlimited access to agent contact details, personalized support, and exclusive market insights tailored to your needs.',
      price: 69900 // Price in paise (₹699)
    }
  ];

  selectedPlan: SubscriptionPlan | null = null;

  constructor(private subscriptionService: SubscriptionService, private router: Router) {}

  ngOnInit(): void {}

  selectPlan(plan: SubscriptionPlan) {
    this.selectedPlan = plan;
  }

  subscribe() {
    if (!this.selectedPlan) {
      alert("Please select a subscription plan.");
      return;
    }

    console.log("Subscription process started...");

    let options = {
      "key": "rzp_test_rPVpoELQpw9Mm5",
      "amount": this.selectedPlan.price, // Use the selected plan's price
      "currency": "INR",
      "name": "Property Subscription",
      "description": "Unlock agent contact details",
      "handler": (response: any) => {
        console.log("Payment successful! ID: ", response.razorpay_payment_id);
        alert("Payment successful! Transaction ID: " + response.razorpay_payment_id);

        this.subscriptionService.setSubscription(true);
        this.router.navigate(['/']);
      },
      "prefill": {
        "name": "User  Name",
        "email": "user@example.com",
        "contact": "9876543210"
      }
    };

    let rzp = new Razorpay(options);
    rzp.open();
  }
}
