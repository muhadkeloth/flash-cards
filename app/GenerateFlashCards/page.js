"use client";

import React, { useState, useRef } from "react";
import { Card,
  CardContent,
  Typography, 
  Box,
  TextField, 
  Button, 
  Tabs,
  Tab,
  CircularProgress,
  Stack } from "@mui/material";
import FlashCard from "@/components/FlashCard";
import Grid from "@mui/material/Grid2";


export default function FlashcardPage() {
  const [input, setInput] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [generateError, setGenerateError] = useState("");

  // Simulated backend call - replace with actual API endpoint
  const generateFlashcards = async (source, content) => {
    // source: text, youtube, pdf;
    setIsLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // const mockFlashcards = [
      //   { question: "What is React?", answer: "A JavaScript library for building UIs" },
      //   { question: "What is Next.js?", answer: "A React framework for production-grade apps" },
      //   { question: "What are Hooks?", answer: "Functions for using state in React components" },
      // ];
        const response = await fetch("/api/generateFlashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      console.log('data',typeof data)
      setFlashcards(data);

      // setFlashcards(mockFlashcards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };
  // const [input, setInput] = useState("");
  // const [flashcards, setFlashcards] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const handleGenerate = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/generateFlashcards", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ text: input }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to generate flashcards");
  //     }

  //     const data = await response.json();
  //     setFlashcards(data);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error generating flashcards");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // // Create a reference for the flashcards container
  // const flashcardsRef = useRef(null);

  // const handleInputChange = (event) => {
  //   setInput(event.target.value);
  // };

  return (
    <div className="max-w-2xl mx-auto p-6">
    <Typography variant="h4" align="center" gutterBottom>
      Flashcard Generator
    </Typography>

    {/* Tabs */}
    <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
      <Tab label="Text Input" />
      <Tab label="YouTube" />
      <Tab label="PDF" />
    </Tabs>

    {/* Text Input Tab */}
    {tabValue === 0 && (
      <div className="space-y-4">
        <TextField
          fullWidth
          label="Enter your text content..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => generateFlashcards("text", input)}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Generate Flashcards"}
        </Button>
      </div>
    )}

    {/* YouTube Tab */}
    {tabValue === 1 && (
      <div className="space-y-4">
        <TextField
          fullWidth
          label="Enter YouTube URL..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => generateFlashcards("youtube", youtubeUrl)}
          disabled={isLoading || !youtubeUrl.trim()}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Generate Flashcards"}
        </Button>
      </div>
    )}

    {/* PDF Tab */}
    {tabValue === 2 && (
      <div className="space-y-4">
        <input type="file" accept=".pdf" onChange={(e) => console.log(e.target.files[0])} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => generateFlashcards("pdf", "pdf-content")}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Generate Flashcards"}
        </Button>
      </div>
    )}

    {/* Flashcard Display */}
    {flashcards.length > 0 && (
      <div className="space-y-6 mt-4">
        <Card
          sx={{
            minHeight: "200px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" align="center">
              {isFlipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}
            </Typography>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="contained" onClick={handlePrevious} disabled={currentCardIndex === 0}>
            Previous
          </Button>
          <Typography>
            {currentCardIndex + 1} / {flashcards.length}
          </Typography>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentCardIndex === flashcards.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    )}
  </div>
    // <div
    //   style={{
    //     padding: "10px",
    //     fontFamily: "Arial",
    //     backgroundColor: "#d3d3d3", // Matching background
    //     minHeight: "100vh",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       width: "100%",
    //       mx: "auto",
    //       mt: 5,
    //       p: 3,
    //       border: "2px solid #323232", // Main color border
    //       borderRadius: 5,
    //       boxShadow: "4px 4px #323232", // Main color shadow
    //       backgroundColor: "#fff", // Background color for the form
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "flex-start",
    //       justifyContent: "center",
    //       gap: 10,
    //     }}
    //   >
    //     <Stack spacing={2} sx={{ width: "100%" }}>
    //       <TextField
    //         placeholder="Enter Text Here ..."
    //         variant="outlined"
    //         fullWidth
    //         multiline
    //         rows={4}
    //         value={input}
    //         onChange={handleInputChange}
    //         sx={{
    //           borderRadius: "5px",
    //           border: "2px solid #323232",
    //           backgroundColor: "#fff",
    //           boxShadow: "4px 4px #323232",
    //           fontSize: "15px",
    //           fontWeight: "600",
    //           color: "#323232",
    //           padding: "5px 10px",
    //           outline: "none",
    //           minHeight: "100px", // Set min height
    //           "& textarea": {
    //             minHeight: "100px", // Ensures the inner textarea has the same minHeight
    //           },
    //           "& .MuiOutlinedInput-root": {
    //             "& fieldset": {
    //               borderColor: "#323232", // Set the border color to match the default
    //             },
    //             "&.Mui-focused fieldset": {
    //               borderColor: "#323232", // Remove the blue outline on focus
    //               boxShadow: "none", // Remove the blue shadow on focus
    //             },
    //           },
    //         }}
    //       />

    //       <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           size="large"
    //           onClick={handleGenerate}
    //           sx={{
    //             textTransform: "none",
    //             fontWeight: "bold",
    //             width: "250px", // Limiting the width of the button
    //             borderRadius: "5px",
    //             border: "2px solid #323232",
    //             backgroundColor: "#fff",
    //             boxShadow: "4px 4px #323232",
    //             fontSize: "16px",
    //             color: "#323232",
    //             cursor: "pointer",
    //             transition: "all 250ms",
    //             "&:hover": {
    //               color: "#e8e8e8",
    //               backgroundColor: "#212121", // Hover background color
    //             },
    //           }}
    //         >
    //           Generate Flashcard
    //         </Button>
    //       </Box>
    //     </Stack>

    //     {/* Render flashcards */}
    //     <Box ref={flashcardsRef} sx={{ width: "100%" }}>
    //       <Grid
    //         sx={{ width: "100%" }}
    //         container
    //         spacing={2}
    //         justifyContent="center"
    //         alignItems="center"
    //       >
    //         {flashcards.map((flashcard, index) => (
    //           <Grid size={{ xs: 12, sm: 6 }} key={index}>
    //             <FlashCard
    //               question={flashcard.question}
    //               answer={flashcard.answer}
    //             />
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Box>
    //   </Box>
    // </div>
  );
}
