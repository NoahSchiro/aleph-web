import { Alert } from "@mui/material";

export default function Disclaimer() {
  return <Alert severity="info" sx={{ mb: 2 }}>Sometimes search / recommendation results can be slow (particularly your first search). This is is a demo and I am not paying a ton of money for a fast, always-on computer. The dataset I am using does not have every book ever written, and the most recent books are from </Alert>;
}
