## 1. What are the top 5 performance/UX issues you anticipate when dealing with large tabular data?

Here are the top 5 challenges I’d expect:

1. **Rendering Performance:**  
   When dealing with thousands of rows, rendering the full table at once can cause major slowdowns due to excessive DOM nodes.

2. **Pagination or Virtualization Lag:**  
   Without proper pagination or virtual scrolling, user interactions like navigating pages or scrolling feel sluggish.

3. **Inefficient Filtering/Search:**  
   Filtering large datasets on the client side can freeze the UI, especially without debounce or async handling , better we should search with query params on backend.

4. **Poor Mobile Experience:**  
   Tables with many columns often overflow or break layout on small screens if not designed responsively.

5. **Accessibility Limitations:**  
   Tables can be hard to navigate with a keyboard or screen reader unless semantic markup and focus management are properly implemented.

---

## 2. How does your code ensure responsiveness and accessibility?

I kept both in mind from the start:

### Responsiveness

- Used Tailwind utility classes like `w-full`, `overflow-x-auto`, and `flex-wrap` to make tables adapt to screen sizes.
- On smaller devices, the table scrolls horizontally instead of breaking layout.
- Modals, forms, and filters stack properly on mobile with consistent spacing.

### Accessibility

- Built tables using semantic HTML (`<table>`, `<thead>`, `<tbody>`, etc.) to improve screen reader support.
- All form elements are paired with `<Label>` components.
- Modal dialogs use ShadCN UI (built on Radix), which manages focus trapping, ARIA roles, and keyboard interaction out of the box.

---

## 3. If you could add one feature to improve vendor management, what would it be and why?

I'd add **smart vendor activity tracking**.

> For example, if a vendor hasn't updated details or responded to emails in 90+ days, automatically flag them as "Stale" or "Needs Review."

**Why?**

- It helps teams focus on active vendors and clean up outdated ones.
- It adds a layer of automation that reduces manual review and keeps the data clean.
- Encourages vendors to stay engaged and responsive.

---

## 4. How did you use any AI tool (if applicable)? What guidance did it provide?

Yes, I used **ChatGPT** as a development assistant. It helped in:

- Structuring reusable components (like modal forms, date pickers, and select dropdowns)
- Quickly generating mock vendor data (10,000 entries with realistic names and categories)
- Solving UI bugs (like pagination glitches or focus ring issues)
- Optimizing Tailwind and ShadCN usage for responsive and accessible designs

> It was a great accelerator for brainstorming, fixing small blocks, and speeding up repetitive work — but the architectural and logic decisions were mine.
