"use client";

import React, { useState, useRef } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import FlashCard from "@/components/FlashCard";
import Grid from "@mui/material/Grid2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FlashcardPage() {
  const [input, setInput] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generateFlashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error(error);
      alert("Error generating flashcards");
    } finally {
      setLoading(false);
    }
  };
  // Create a reference for the flashcards container
  const flashcardsRef = useRef(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial",
        backgroundColor: "#d3d3d3", // Matching background
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          mt: 5,
          p: 3,
          border: "2px solid #323232", // Main color border
          borderRadius: 5,
          boxShadow: "4px 4px #323232", // Main color shadow
          backgroundColor: "#fff", // Background color for the form
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            placeholder="Enter Text Here ..."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={handleInputChange}
            sx={{
              borderRadius: "5px",
              border: "2px solid #323232",
              backgroundColor: "#fff",
              boxShadow: "4px 4px #323232",
              fontSize: "15px",
              fontWeight: "600",
              color: "#323232",
              padding: "5px 10px",
              outline: "none",
              minHeight: "100px", // Set min height
              "& textarea": {
                minHeight: "100px", // Ensures the inner textarea has the same minHeight
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#323232", // Set the border color to match the default
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#323232", // Remove the blue outline on focus
                  boxShadow: "none", // Remove the blue shadow on focus
                },
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGenerate}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                width: "250px", // Limiting the width of the button
                borderRadius: "5px",
                border: "2px solid #323232",
                backgroundColor: "#fff",
                boxShadow: "4px 4px #323232",
                fontSize: "16px",
                color: "#323232",
                cursor: "pointer",
                transition: "all 250ms",
                "&:hover": {
                  color: "#e8e8e8",
                  backgroundColor: "#212121", // Hover background color
                },
              }}
            >
              Generate Flashcard
            </Button>
          </Box>
        </Stack>

        {/* Render flashcards */}
        <Box ref={flashcardsRef} sx={{ width: "100%" }}>
          <Grid
            sx={{ width: "100%" }}
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {flashcards.map((flashcard, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <FlashCard
                  question={flashcard.question}
                  answer={flashcard.answer}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
