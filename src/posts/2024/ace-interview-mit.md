---
title: أحتراف أسئلة المقابلات البرمجية
date: 2024-01-15
---

> هذا الجزء الأول من مادة علمية من جامعة MIT عن كيفية تجاوز المقابلات البرمجية [المصدر](https://courses.csail.mit.edu/iap/interview/materials.php)

## لغز العملة النقدية (سؤال تقليدي)

**نص المسألة**: لديك ثمانية عملات نقدية متساوية في الوزن باستثناء عملة واحدة لديها وزن أعلى من الباقي (أنت لا تعلم العملة الأثقل وزناً), وايضا لديك الميزان القديم (ذو الكفتين).

**المطلوب**: ماهو أقل عدد من الخطوات (وزن العملات) التي يمكنك القيام بها من أجل معرفة العملة الأثقل؟

- جواب صحيح ولكن غير مثالي:

  1. وضع أربع عملات في كل كفة للميزان.
  2. أخذ الكفة الأثقل وتقسيمها ايضا إلى قسمين في كل كفة للميزان, وهكذا حتى نحصل على على العملة الأثقل.

- الجواب المثالي:

  وضع ثلاث عملات في كل كفة, فإذا رجحت أحدى الكفتين نأخذ الكفة الراجحة ونقارن العملات التي تحتويها لنحصل على العملة الأثقل. بينما إذا كانت الكفتين متساويتين (3v3) عندها نقارن العملتين المتبقتين لنحصل على الأثقل.

## نصائح للمقابلة

عندما يتم سؤالك في المقابلة, قم بمحاورة المقُابل. شاركه ما الذي تفكر فيه مثل أن تخبره ان الحل الذي قدمته صحيح ولكنها ليس الأمثل, قم بذكر بعض الافكار التي قود للحل. فعادة سوف يشاركك المقًابل بعض التلميحات او قد يصحح مسار تفكيرك ويفور عليك الطريق لإثبات انك كنت في الطريق الخطأ.

عادة سوف يطلب منك ان تكتب الحل بطريقة تجريدية عن طريق اللوحة البيضاء أو حتى باستخدام برامج التحرير النصي مثل مستندات جوجل, لذلك من المفيد أن تتعلم دائما ان تناقش الحل وتكتبه باستخدام المسودات.

هذه قائمة بماذا عليك أن تفعله وما الذي يجب عليك تجنبه أثناء مقابلات البرمجة:

**أفعل**:

- اسأل 