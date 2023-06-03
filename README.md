# CHESS

The game of chess written in TypeScript (still working on it!!!)

### Description

- The game starts with player one making the move first
- You can only click on the piece of the player in turn
- The highlighted square shows the possible moves for that piece
- if the king is in check, the player is restricted in playing the pieces and their possible move that will get him out of check
- on checkmate the game resets by refreshing the browser (I know its silly but I am still working on the game)

### usage

You need to have Git and TypeScript installed in your local machine

1. Clone the repo in your empty local directory

```
mkdir chess
cd chess
git clone <repo url>
```

2. Run the TypeScript compiler (don't worry .tsconfig file has everything the compiler needs to know!)

```
tsc
```

3. Open the index.html file inside the root and voila! you are ready to go :)
