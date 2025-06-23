import React, { useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Paper,
  Alert,
  Link,
  CircularProgress,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(8),
    borderRadius: 16,
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255,255,255,0.85)',
  }));

  const handleShorten = async () => {
    setLoading(true);
    setError('');
    setShortUrl('');
    try {
      const res = await axios.post('http://localhost:3000/', { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setError('Copied to clipboard!');
    setTimeout(() => setError(''), 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
            URL Shortener&nbsp;
            <LinkIcon fontSize="large" sx={{ verticalAlign: 'middle' }} />
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StyledPaper elevation={6}>
          <Container>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
              Paste your long URL and get a short, shareable link instantly
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <TextField
                fullWidth
                label="Enter URL"
                variant="outlined"
                value={url}
                onChange={e => setUrl(e.target.value)}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ background: '#f7f7fa', borderRadius: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleShorten}
                disabled={!url || loading}
                sx={{ minWidth: 140, fontWeight: 600, borderRadius: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Shorten'}
              </Button>
            </Box>

            {/* Alerts */}
            {shortUrl && (
              <Alert severity="success" icon={<LinkIcon />} sx={{ mt: 4 }}>
                <Typography variant="body1">
                  Short URL:&nbsp;
                  <Link href={shortUrl} target="_blank" underline="hover" sx={{ fontSize: 18 }}>
                    {shortUrl}
                    <OpenInNewIcon sx={{ ml: 0.5, fontSize: 18 }} />
                  </Link>
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<OpenInNewIcon />}
                    href={shortUrl}
                    target="_blank"
                  >
                    Open
                  </Button>
                </Stack>
              </Alert>
            )}

            {error && !shortUrl && (
              <Alert severity={shortUrl ? 'success' : 'error'} sx={{ mt: 4 }}>
                {error}
              </Alert>
            )}
          </Container>
        </StyledPaper>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.2)' }}>
        <Button
          variant="text"
          startIcon={<GitHubIcon />}
          component="a"
          href="https://github.com/Subhash0604/2203031260177"
          target="_blank"
          sx={{ color: '#fff' }}
        >
          View on GitHub
        </Button>
      </Box>
    </Box>
  );
}

export default App;
