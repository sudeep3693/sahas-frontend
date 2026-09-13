import depositLogo from "../Images/Products/Deposits/depositLogo.png";
import normalSaving from "../Images/Products/Deposits/normalSaving.png";
import monthlySaving from "../Images/Products/Deposits/monthlySaving.png";
import womenSaving from "../Images/Products/Deposits/womenSaving.png";
import childSaving from "../Images/Products/Deposits/childSaving.png";
import festivalSaving from "../Images/Products/Deposits/festivalSaving.png";
import loanSaving from "../Images/Products/Deposits/loanSaving.png";

import loanLogo from "../Images/Products/Loans/loanLogo.png";
import shorttermLoan from "../Images/Products/Loans/shorttermLoan.png";
import personalLoan from "../Images/Products/Loans/personalLoan.png";
import homeLoan from "../Images/Products/Loans/homeLoan.png";
import businessLoan from "../Images/Products/Loans/businessLoan.png";
import agricultureLoan from "../Images/Products/Loans/aggricultureLoan.png";

const Products = [
  {
    productTitle: "बचत योजनाहरू",
    productSubTitle: "सुरक्षित बचत, उज्ज्वल भविष्य",
    productDescription: "साहस बचत तथा ऋण सहकारी संस्थाले आफ्ना सदस्यहरूको आवश्यकता अनुसार आकर्षक ब्याजदर र उच्चतम सुरक्षाका साथ विभिन्न बचत योजनाहरू सञ्चालन गर्दै आएको छ। नियमित थोरै-थोरै बचत गरेर भविष्यको ठूलो योजना साकार पार्न हामीसँग जोडिनुहोस्।",
    productTitleImage: depositLogo,
    productId: "1",
    Topics: [
      {
        innerTitle: "साधारण बचत",
        productInnerImage: normalSaving,
        innerDescription: "सबै वर्गका सदस्यहरूका लागि सहज र लचिलो बचत खाता। दैनिक वा नियमित रूपमा रकम जम्मा गर्न र आवश्यक परेको बेला सजिलै झिक्न सकिने यो खाताले तपाईंको रकमलाई सुरक्षित राख्दै उचित ब्याज आम्दानी प्रदान गर्दछ।",
      },
      {
        innerTitle: "महिला स्वावलम्बन बचत",
        productInnerImage: womenSaving,
        innerDescription: "महिलाहरूको आर्थिक सशक्तीकरण र आत्मनिर्भरताका लागि विशेष रूपमा तयार गरिएको बचत योजना। यस खातामा उच्च ब्याजदरका साथै महिला सदस्यहरूलाई आयआर्जन र व्यवसायमा विशेष प्राथमिकता दिइन्छ।",
      },
      {
        innerTitle: "बाल उज्ज्वल बचत",
        productInnerImage: childSaving,
        innerDescription: "आफ्ना बालबालिकाको उच्च शिक्षा र सुरक्षित भविष्यका लागि अभिभावकले खोल्न सक्ने विशेष खाता। नियमित सानो बचतले भविष्यमा अध्ययन तथा आकस्मिक खर्चको सहज व्यवस्थापन गर्न मद्दत पुर्‍याउँछ।",
      },
      {
        innerTitle: "मासिक क्रमिक बचत",
        productInnerImage: monthlySaving,
        innerDescription: "नियमित आम्दानी हुने सदस्यहरूका लागि मासिक रूपमा निश्चित रकम जम्मा गर्दै जाने अनुशासित बचत योजना। निश्चित अवधिपछि एकमुष्ट आकर्षक रकम र प्रतिफल प्राप्त हुने भएकाले यसले भविष्यको ठूलो लक्ष्य पूरा गर्छ।",
      },
      {
        innerTitle: "चाडपर्व तथा उत्सव बचत",
        productInnerImage: festivalSaving,
        innerDescription: "दशैं, तिहार, तीज लगायतका महत्वपूर्ण चाडपर्व तथा पारिवारिक उत्सवहरूमा हुने खर्चलाई तनावमुक्त बनाउन वर्षभरि थोरै-थोरै रकम जम्मा गर्ने र चाडपर्वको समयमा बोनससहित भुक्तानी लिने सरल योजना।",
      },
      {
        innerTitle: "ऋण सुरक्षण बचत",
        productInnerImage: loanSaving,
        innerDescription: "सहकारीबाट ऋण सुविधा लिएका सदस्यहरूका लागि कर्जा भुक्तानीलाई सहज र सुरक्षित बनाउने बचत योजना। कर्जा चुक्ता हुँदासम्म नियमित बचतको बानी बस्ने र थप आर्थिक सुरक्षा प्राप्त हुने सुविधा।",
      },
    ]
  },
  {
    productTitle: "कर्जा सेवाहरू",
    productSubTitle: "सुलभ कर्जा, समृद्ध जीवन",
    productDescription: "सदस्यहरूको व्यक्तिगत, पारिवारिक, व्यापारिक तथा आकस्मिक आर्थिक आवश्यकता पूरा गर्न साहस सहकारीले सरल प्रक्रिया, छिटोछरितो सेवा र सुलभ ब्याजदरमा विभिन्न कर्जा सुविधाहरू उपलब्ध गराउँछ।",
    productTitleImage: loanLogo,
    productId: "2",
    Topics: [
      {
        innerTitle: "घर तथा आवास कर्जा",
        productInnerImage: homeLoan,
        innerDescription: "आफ्नै सुन्दर घर बनाउने, खरिद गर्ने वा मर्मत सम्भार गर्ने सपना साकार पार्न साहस सहकारीको आवास कर्जा। लामो समयको सहज किस्ताबन्दी, सस्तो ब्याजदर र सरल प्रक्रियामा उपलब्ध हुने भरपर्दो कर्जा सुविधा।",
      },
      {
        innerTitle: "व्यक्तिगत तथा सामाजिक कर्जा",
        productInnerImage: personalLoan,
        innerDescription: "शिक्षा, स्वास्थ्य, पारिवारिक आवश्यकता वा अन्य व्यक्तिगत कामका लागि तत्काल आवश्यक पर्ने रकम सजिलै प्राप्त गर्न सकिने कर्जा योजना। न्यूनतम कागजी प्रक्रियामै छिटो सेवा।",
      },
      {
        innerTitle: "व्यापार तथा व्यवसाय कर्जा",
        productInnerImage: businessLoan,
        innerDescription: "नयाँ व्यवसाय सुरु गर्न वा चलिरहेको व्यापार विस्तार गर्न व्यवसायी सदस्यहरूका लागि कार्यशील पुँजी कर्जा। व्यापार वृद्धिका साथै समुदायको आर्थिक विकासमा टेवा पुर्‍याउने उद्देश्य।",
      },
      {
        innerTitle: "छोटो अवधिको सरल कर्जा",
        productInnerImage: shorttermLoan,
        innerDescription: "आकस्मिक तथा तत्काल आइपर्ने वित्तीय आवश्यकतालाई सम्बोधन गर्न छोटो अवधिका लागि दिइने सरल कर्जा। न्यून प्रक्रिया र तुरुन्त निकासा हुने सहज व्यवस्था।",
      },
      {
        innerTitle: "कृषि तथा पशुपालन कर्जा",
        productInnerImage: agricultureLoan,
        innerDescription: "किसान तथा कृषि उद्यमीहरूको उत्पादन र आयआर्जन बढाउन बीउबिजन, मलखाद, आधुनिक औजार तथा पशुपालनका लागि सुलभ ब्याजदरमा प्रदान गरिने विशेष कर्जा सुविधा।",
      },
    ]
  }
];

export default Products;