- **Key Points:**
    - This document describes a collection of mathematical utility functions located in `src/utils/math.ts`.
    - The primary functions covered are `softmax`, `logit`, `sigmoid`, and an experimental `inverseSoftmax`.
    - The `softmax` function's purpose is to convert an array of numbers into a probability distribution.
    - The `logit` and `sigmoid` functions are presented as inverses of each other, used for converting between probabilities and log-odds.
    - A critical point highlighted is that the `inverseSoftmax` function is experimental because reversing the softmax transformation is an "ill-posed problem" with no unique solution.
    - The utility functions are self-contained, depending only on the standard `Math` object.

- **Structure Summary:**
    - **Reason:** States the document's goal is to provide documentation for the math utilities.
    - **Raw Concept:** Identifies the source file (`src/utils/math.ts`) and the documentation task.
    - **Narrative:** Describes the file's structure, dependencies (none external), and provides a summary of the key functions.
    - **Facts:** Lists concise, important truths about the functions, such as the relationship between logit and sigmoid and the non-uniqueness issue with inverse softmax.

- **Notable Entities, Patterns, or Decisions:**
    - **Entities:** The functions `softmax`, `logit`, `sigmoid`, and `inverseSoftmax`.
    - **Source File:** `src/utils/math.ts`.
    - **Key Decision:** The choice to implement an `inverseSoftmax` function is explicitly labeled as "experimental".
    - **Noted Problem:** The documentation clearly states that reversing the softmax function is an ill-posed problem because any constant can be added to the input logits without changing the resulting probability distribution, making a unique inverse impossible.