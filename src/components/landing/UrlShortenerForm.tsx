import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import { isValidUrl } from "@/utils/validateUrl";
import { createShortCode } from "@/features/url/urlApi";
import { BASE_URL } from "@/lib/httpClient";

export const UrlShortenerForm = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please enter a URL.");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError("Please enter a valid URL (e.g. https://example.com/page).");
      return;
    }

    setError("");
    setShortUrl("");
    setLoading(true);
    try {
      const result = await createShortCode({ url: trimmedUrl });
      setShortUrl(`${BASE_URL}/${result.shortCode}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <Box sx={{ maxWidth: "720px", mx: "auto" }}>
      <Paper
        component="form"
        onSubmit={handleShorten}
        elevation={3}
        sx={{
          p: 1.5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.08)",
        }}
      >
        <TextField
          fullWidth
          placeholder="Paste any extensive, UTM-tagged URL..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError("");
          }}
          variant="standard"
          error={Boolean(error)}
          helperText={error}
          slotProps={{
            input: {
              disableUnderline: true,
              sx: {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.95rem",
                px: 2,
                color: "#0F172A",
              },
            },
            formHelperText: { sx: { px: 2, textAlign: "left" } },
          }}
          sx={{ justifyContent: "center" }}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={loading}
          startIcon={<BoltIcon />}
          sx={{
            backgroundColor: "#4F46E5",
            color: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "10px",
            px: 4,
            py: 1.5,
            whiteSpace: "nowrap",
            "&:hover": { backgroundColor: "#4338CA" },
            "&:focus-visible": {
              boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 4px #4F46E5",
            },
          }}
        >
          {loading ? "Shortening..." : "Shorten Link"}
        </Button>
      </Paper>

      {shortUrl && (
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #C7D2FE",
            borderRadius: "12px",
            backgroundColor: "#EEF2FF",
          }}
        >
          <Link
            href={shortUrl}
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ fontWeight: 600, color: "#4F46E5" }}
          >
            {shortUrl}
          </Link>
          <Tooltip title="Copy">
            <IconButton onClick={handleCopy} aria-label="Copy short link">
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      )}
    </Box>
  );
};
