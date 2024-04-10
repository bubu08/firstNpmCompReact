import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SmartRating from "./SmartRating";
import { act } from '@testing-library/react';

describe("SmartRating", () => {
    test("renders the Rating component", () => {
        render(<SmartRating title="default" theme="primary" testIdPrefix="rating" />);

        expect(screen.getByRole("heading").innerHTML).toEqual("default");
        expect(screen.getAllByRole("button", { hidden: true }).length).toEqual(5);
    });

    test("click the 5 star rating", async () => {
        const stars = [0, 1, 2, 3, 4];
        render(<SmartRating title="default" theme="primary" testIdPrefix="rating" />);

        // stars.forEach(async (star) => {
        //   const element = screen.getByTestId("rating-" + star);
        //   userEvent.click(element);
        //   await waitFor(() => expect(element.className).toBe("starActive"));
        // });
        for (const star of stars) {
            const element = screen.getByTestId("rating-" + star);
            // Ensure userEvent.click is awaited if it returns a Promise
            act(() => {
                // Perform actions that update state here
                userEvent.click(element);
              });
            // waitFor is used to wait for the expectation to pass, which is especially useful for components with async state updates.
            await waitFor(() => expect(element.className).toBe("starActive"), { timeout: 1000 }); // Extends the timeout to 1000ms

        }
    });
});