# Week 6 / State Management

**This week** we focus on managing state in React Native applications.
**Bu hafta** React Native uygulamalarında state yönetimine odaklanıyoruz.

---

## What is State? / State Nedir?

- **Definition / Tanım:** State represents the current data of a component or the entire application.
  State, bir bileşenin veya uygulamanın o anki verilerini temsil eder.

---

## Why Manage State? / State Nasıl Yönetilir ve Neden Önemlidir?

As your app grows, multiple components need to access or update the same data.
Uygulamanız büyüdükçe, birçok bileşen aynı verilere erişmek veya bu verileri güncellemek ister.

**Effective state management** provides:
**Etkili state yönetimi şunları sağlar:**

| Responsibility / Sorumluluk | Description / Açıklama                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| Tracking / Takip            | Keeps track of the current state across your app.<br/>Uygulamanızın mevcut state’i izler.           |
| Updating / Güncelleme       | Allows safe and predictable state changes.<br/>State’i güvenli ve öngörülebilir şekilde değiştirir. |
| Syncing / Senkronizasyon    | Ensures data consistency between components.<br/>Bileşenler arasında veri tutarlılığını sağlar.     |

Without proper state management, code becomes complex and prone to bugs.
Doğru state yönetimi olmadan, kod karmaşıklaşır ve hatalara açık hale gelir.

---

## Common Libraries / Yaygın Kütüphaneler

**These libraries are commonly used for state management in React Native apps.**
**Bu kütüphaneler React Native uygulamalarında state yönetimi için yaygın olarak kullanılır.**

| Library     | Use Case / Kullanım                                                        | Pros / Avantajlar                                                                     | Cons / Dezavantajlar                                                    |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Context API | Simple global state (theme, user)<br/>Basit global state (tema, kullanıcı) | Built-in, no extra deps<br/>Yerleşik, ek bağımlılık yok                               | Perf issues in large apps<br/>Büyük uygulamalarda performans sorunları  |
| useReducer  | Moderate complexity logic<br/>Orta karmaşıklıkta state mantığı             | Predictable via actions<br/>Action tabanlı, öngörülebilir                             | Some boilerplate<br/>Bir miktar boilerplate kod                         |
| Zustand     | Small/medium global state<br/>Küçük ve orta ölçekli global state           | Lightweight, minimal API<br/>Hafif, basit API                                         | Lacks advanced features<br/>Gelişmiş özellikler sınırlı                 |
| Recoil      | Atom-based state<br/>Atom tabanlı state yönetimi                           | Easy React integration<br/>Kolay React entegrasyonu                                   | Ecosystem maturing<br/>Eko-sistem gelişme aşamasında                    |
| Redux       | Large-scale predictable state<br/>Büyük ölçekli, öngörülebilir state       | Rich middleware & devtools<br/>Gelişmiş middleware ve devtools                        | Lots of boilerplate<br/>Çok fazla boilerplate kod                       |
| MobX        | Reactive & flexible state<br/>Reaktif ve esnek state yönetimi              | Less boilerplate, automatic reactivity<br/>Daha az boilerplate, otomatik reaktif yapı | Unpredictable if misused<br/>Yanlış kullanıldığında öngörülemez akışlar |
