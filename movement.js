document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.square');
    let selectedPiece = null;
    
    // Add click event listeners to all squares
    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
    
    function handleSquareClick(event) {
        // Find the clicked element (square or piece)
        const clickedElement = event.target;
        const square = clickedElement.classList.contains('square') 
            ? clickedElement 
            : clickedElement.parentElement;
        
        // Check if we already have a selected piece
        if (selectedPiece) {
            // If clicking on a dark square, move the piece
            if (square.classList.contains('dark')) {
                // Only move if the target square is different from the current one
                if (selectedPiece.parentElement !== square) {
                    movePiece(selectedPiece, square);
                }
            }
            
            // Deselect the piece after any click
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            
            // Remove all highlights
            document.querySelectorAll('.square.highlight').forEach(sq => {
                sq.classList.remove('highlight');
            });
        } 
        // If no piece is selected, try to select one
        else {
            // Check if we clicked on a piece
            const piece = clickedElement.classList.contains('piece') 
                ? clickedElement 
                : clickedElement.querySelector('.piece');
                
            if (piece) {
                // Select this piece
                selectedPiece = piece;
                selectedPiece.classList.add('selected');
                
                // Highlight the current square
                square.classList.add('highlight');
            }
        }
    }
    
    function movePiece(piece, targetSquare) {
        // Check if target square already has a piece
        if (targetSquare.querySelector('.piece')) {
            return; // Don't allow moving to an occupied square
        }
        
        // Move the piece to the new square
        targetSquare.appendChild(piece);
    }
});
