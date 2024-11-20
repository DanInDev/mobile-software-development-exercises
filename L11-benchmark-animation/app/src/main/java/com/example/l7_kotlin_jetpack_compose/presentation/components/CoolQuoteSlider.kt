import android.graphics.drawable.GradientDrawable
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import androidx.constraintlayout.compose.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.focusModifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview

@Preview
@OptIn(ExperimentalMotionApi::class)
@Composable
fun CoolQuoteSlider() {
    var progress by remember { mutableFloatStateOf(0f) }
    val context = LocalContext.current
    val displayMetrics = context.resources.displayMetrics
    val dragPadding = 350
    val quotes = listOf(
        "Meh",
        "Mid",
        "Aight",
        "HOLY POGGERS"
    )

    val emojis = listOf(
        "👀",
        "🤨",
        "😐",
        "😳"
    )

    val quoteIndex = ((progress * (quotes.size - 1)).toInt()).coerceIn(0, quotes.size - 1)
    val currentQuote = quotes[quoteIndex]
    val currentEmoji = emojis[quoteIndex]

    // Start and end constraint sets
    val startConstraintSet = ConstraintSet {
        val handle = createRefFor("handle")
        val quoteText = createRefFor("quoteText")

        constrain(handle) {
            width = Dimension.value(50.dp)
            height = Dimension.value(50.dp)
            start.linkTo(parent.start)
            centerVerticallyTo(parent)
        }

        constrain(quoteText) {
            top.linkTo(handle.bottom)
            centerHorizontallyTo(parent)
        }
    }

    val endConstraintSet = ConstraintSet {
        val handle = createRefFor("handle")
        val quoteText = createRefFor("quoteText")

        constrain(handle) {
            width = Dimension.value(50.dp)
            height = Dimension.value(50.dp)
            end.linkTo(parent.end)
            centerVerticallyTo(parent)
        }

        constrain(quoteText) {
            top.linkTo(handle.bottom)
            centerHorizontallyTo(parent)
        }
    }
    Box(
        modifier = Modifier.background(MaterialTheme.colorScheme.secondary).padding(16.dp),
        contentAlignment = Alignment.TopStart
    )
    {
        val brush = Brush.horizontalGradient(listOf(Color.Blue,Color.Red))
        HorizontalDivider(
            thickness = 10.dp,
            modifier = Modifier.align(Alignment.Center).fillMaxWidth().background(brush),
            color = Color.Transparent // transparent to ensure that I can use brush from background as the color
        )
        MotionLayout(
            start = startConstraintSet,
            end = endConstraintSet,
            progress = progress,
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp)
                .padding(horizontal = 16.dp)
        ) {
            Box(
                modifier = Modifier
                    .layoutId("handle")
                    .pointerInput(Unit) {
                        detectHorizontalDragGestures { change, dragAmount ->
                            val delta = dragAmount / (displayMetrics.widthPixels-dragPadding)
                            progress = (progress + delta).coerceIn(0f, 1f)
                        }
                    }
                    .background(
                        Color(
                            android.graphics.Color.rgb(
                                (progress * 255).toInt(),
                                0,
                                ((1 - progress) * 255).toInt()
                            )
                        ),
                        shape = MaterialTheme.shapes.small
                    ).border(
                        width = 1.dp,
                        color = Color.White,
                        shape = MaterialTheme.shapes.small)
            ) {
                Text(
                    text = currentEmoji,
                    fontFamily = MaterialTheme.typography.titleLarge.fontFamily,
                    modifier = Modifier.align(Alignment.Center)
                )
            }
            Text(
                text = currentQuote,
                modifier = Modifier
                    .layoutId("quoteText")
                    .padding(16.dp),
                fontSize = 18.sp,
                textAlign = TextAlign.Center
            )
        }
    }
}
